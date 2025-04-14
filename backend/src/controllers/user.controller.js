import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import { ApiResponse } from "../utils/ApiResponse.js";
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


    const user = await User.create({
        name,
        email,
        password,
        phone,
        studentId,
        department,
        gender
    })

})

export {registerUser}
