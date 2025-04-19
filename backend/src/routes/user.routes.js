import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getMyProfile,
  getSomeUserProfile
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'; 

const router = express.Router();

router.post('/register', upload.fields([{ name: 'profileImage', maxCount: 1 }]), registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);

router.post('/logout', verifyJWT, logoutUser);
router.post('/change-password', verifyJWT, changeCurrentPassword);
router.get('/me', verifyJWT, getMyProfile);
router.get('/:id', verifyJWT, getSomeUserProfile); 

export default router;
