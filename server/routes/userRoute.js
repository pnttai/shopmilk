import { Router } from 'express';
import { forgotPasswordController, loginController, logoutController, registerUserController, resetPasswordController, updateUserDetails, uploadAvatarController, userDetails, verifyEmailController } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout',auth,logoutController);
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatarController);
userRouter.put('/forgot-password',forgotPasswordController);
userRouter.put('/verify-forgot-password',verifyEmailController);
userRouter.put('/reset-password',resetPasswordController);
userRouter.get('/user-details',auth,userDetails)
userRouter.put('/upload-user',auth,updateUserDetails);


export default userRouter;

