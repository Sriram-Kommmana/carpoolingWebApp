import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}


    }catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, phone, studentId, department, gender} = req.body

    if([name, email,password, phone, studentId, department, gender].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({$or: [{email}, {phone}, {studentId}]})
    if(existedUser){
        throw new ApiError(400, "User already exists")
    }
    //profile image
    const profileImageLocalPath = req.files?.profileImage[0]?.path;
    if(!profileImageLocalPath){
        throw new ApiError(400, "Profile image is required")
    }
    const profileImage = await uploadOnCloudinary(profileImageLocalPath)

    if(!profileImage){
        throw new ApiError(500, "Something went wrong while uploading profile image")
    }


    const user = await User.create({
        name,
        email,
        password,
        phone,
        studentId,
        department,
        gender,
        profileImage: profileImage.secure_url,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(201).json(new ApiResponse(201, "User created successfully", createdUser))
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    if([email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(401, "Invalid credentials / User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken,
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401, "Invalid Refresh token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(new ApiResponse(200, {accessToken, refreshToken: newRefreshToken},"Access token refreshed"))
    } catch (error) {
        throw new ApiError(410, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword, confPassword} = req.body

    if(newPassword !== confPassword){
        throw new ApiError(400, "Password and confirm password do not match")
    }
    if(!oldPassword || !newPassword){
        throw new ApiError(400, "Current and new password is required")
    }
    const user = await User.findById(req.user._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getMyProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "Your profile"));
})

const getSomeUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user, "Requested user's profile"));
});


export {registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getMyProfile, getSomeUserProfile}
