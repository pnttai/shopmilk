import UserModel from '../models/user_model.js'; // Sửa lại tên model
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'; // Sửa lại tên biến
import generateAccessToken from '../utils/generatedAccessToken.js';
import generateRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadimageClodinary.js';
import gennerratedOtp from '../utils/generatedOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import sendEmail from '../config/sendEmail.js';


 // Thêm import hàm sendEmail

export async function registerUserController(request, response) { // Sửa lại tên biến response
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({ // Sửa lại tên biến response
                message: "Cung cấp đầy đủ username, email, password",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email }); // Sửa lại tên model

        if (user) {
            return response.json({ // Sửa lại tên biến response
                message: "Email đã được đăng ký",
                error: true,
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const payload = {
            name,
            email,
            password: passwordHash
        };

        const newUser = new UserModel(payload); // Sửa lại tên model
        const savedUser = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser?._id}`; // Sửa lại tên biến môi trường
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: 'Xác thực email từ Shopmilk',
            html: verifyEmailTemplate({ // Sửa lại tên biến
                name,
                url: verifyEmailUrl
            })
        });

        return response.json({ // Sửa lại tên biến response
            message: "Đăng ký thành công",
            error: false,
            success: true,
            data: savedUser
        });

    } catch (error) {
        return response.status(500).json({ // Sửa lại tên biến response
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyEmailController(request, response) { // Sửa lại tên biến response
    try {
        const { code } = request.body;

        const user = await UserModel.findOne({ _id: code }); 
        if (!user) {
            return response.status(400).json({ // Sửa lại tên biến response
                message: "Mã xác thực không hợp lệ",
                error: true,
                success: false
            });
        }
        
        const updatedUser = await UserModel.findByIdAndUpdate( {_id : code}, { verify_email: true })
        return response.json({ // Sửa lại tên biến response
            message: "Xác thực email thành công",
            error: true,
            success: false  ,
        
         }) ; 
       
    }
    catch (error) {
        return response.status(500).json({ // Sửa lại tên biến response
            message: error.message || error,
            error: true,
            success: true
        });
    }
}

// login controller
export async function loginController(request, response) { // Sửa lại tên biến response
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ // Sửa lại tên biến response
                message: "Cung cấp đầy đủ email và password",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email }); // Sửa lại tên model

        if (!user) {
            return response.status(400).json({ 
                message: "Email không tồn tại",
                error: true,
                success: false
            });
        }

        const checkAccountStatus = await
        UserModel.findOne({email: email, verify_email: false}); 

        if (user.status !== "Active" ) {
            return response.status(400).json({ 
                message: "Goi cho admin",
                error: true,
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({
                message: "Mật khẩu không chính xác",
                error: true,
                success: false
            });
        }

        // if (!user.verify_email) {
        //     return response.json({ 
        //         message: "Vui lòng xác thực email",
        //         error: true,
        //         success: false
        //     });
        // }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        const cookiesOption = {
            httpOnly: true,
          //  expires: new Date(new Date().getTime() + 7*24*60*60*1000),
          //  secure: process.env.NODE_ENV === 'production' ? true : false
            secure : true,
            sameSite: 'None'
        }
        response.cookie('accessToken', accessToken, cookiesOption);
        response.cookie('refreshToken', refreshToken, cookiesOption);

        return response.json({
            message: "Đăng nhập thành công",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
                
            }
        });
      

    } catch (error) {
        return response.status(500).json({ 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
// logout controller
export async function logoutController(request, response) {
    try{

        const userId = request.userId;
        const cookiesOption = {
            httpOnly: true,
            secure : true,
            sameSite: 'None'
        }
        response.clearCookie("accessToken",cookiesOption)
        response.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {refreshToken: ""})

        return response.json({
            message : "dang xuat thanh cong",
            error: false, 
            success: true
        })
        
    }catch(error){
        console.error("Logout error:", error);
        return  response.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success :false
        })
    }
    
}

// upload user avatar
export async function uploadAvatarController(request, response) {
    try{
        const userId = request.userId;
        const image = request.file;

        const upload = await uploadImageCloudinary(image);
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            avatar: upload.url
        }    )
        return response.json({
            message: "Upload avatar thành công",
            success: true,
            error: false,
            data: {
                _id : userId,
                avatar: upload.url
            }
        });

    }   catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }

}
// forgor password not login
export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;

        const user = await UserModel.findOne({ email });

        if(!user){
            return response.status(400).json({
                message: "Email không tồn tại",
                error: true,
                success: false
            });
        }

        const otp = gennerratedOtp();
        const expireTime = new Date().getTime() + 10*60*1000;
        const update = await UserModel.findByIdAndUpdate(user._id, { 
            forgot_password_otpotp : otp,
            forgot_password_expiry: new Date(expireTime).toISOString()    
        })

        await sendEmail({
            sendTo: email,
            subject: "Mã OTP đổi mật khẩu",
            html: forgotPasswordTemplate ({
                name: user.name,
                otp : otp
            })
        })
        return response.json({
            message: "Mã OTP đã được gửi đến email của bạn",
            error: false,
            success: true
        });

    }catch (error) {
        console.error("Error in forgotPasswordController:", error);
        return response.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
}

// verify forgot password otp
export async function verifyForgotPasswordOtpController(request, response) {
    try {
        const { email, otp } = request.body;
        if(!email || !otp){
            return response.status(400).json({
                message: "Cung cấp đầy đủ email và otp",
                error: true,
                success: false
            });
        }

        const user = await UserModel .findOne({ email, forgot_password_otpotp: otp, forgot_password_expiry: { $gt: new Date().getTime() } });
        if(!user){
            return response.status(400).json({
                message: "OTP không hợp lệ hoặc đã hết hạn",
                error: true,
                success: false
            });
        }
        const currentTime = new Date().getTime();
        if(user.forgot_password_expiry < currentTime){
            return response.status(400).json({
                message: "OTP đã hết hạn",
                error: true,
                success: false
            });
        }
        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message: "OTP không hợp lệ",
                error: true,
                success: false
            });
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry:""
        })


       return response.json({
              message: "Xac minh OTP thanh cong",
              error: false,
              success: true
         });
    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

// reset password
export async function resetPasswordController(request, response) {
    try{
        const {email , newPassword , confirmPassword} = request.body;

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message: "Cung cấp đầy đủ email, mật khẩu mới và xác nhận mật khẩu",
                error: true,
                success: false
            });
        }
        const user = await
        UserModel.findOne({email});
        if(!user){
            return response.status(400).json({
                message: "Email không tồn tại",
                error: true,
                success: false
            });
        }
        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message: "Mật khẩu mới không khớp",
                error: true,
                success: false
            });
        }      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const update = await UserModel
        .findByIdAndUpdate(user._id, {
            password: hashedPassword
        });
        return response.json({
            message: "Đổi mật khẩu thành công",
            error: false,
            success: true
        });
        
    }catch (error) {
    return response.status(500).json({
        message: error.message || error,
        error: true
    });
    }
}
// refres tokenn
export async function refreshToken(request,response) {
    try{
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split("")[1]
         
        if(!refreshToken){
            return response.status(401).json({
                message :"invalitoken",
                error : true,
                success : false
            })
        }

    }catch{

    }
    
}



// get login details
export async function userDetails(request,response) {
    try{
        const userId = request.userId
        console.log(userId)
        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
           message : 'user details',
           data : user,
           error: false,
           success : true     
        })
    }catch(error){
        return response.status(500).json({
            message : 'có gì đó không ổn',
            error: ture,
            success : false     
         })
    }
}
export async function updateUserDetails(request,response) {
    try{
        const userId = request.userId
        const {name, mobile , email , password} = request.body
        let hashPassword = ""
        if(password){
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
        }
        const updateUser = await UserModel.updateOne({_id:userId}, {
            ...(name && {name:name}),
            ...(mobile && {mobile:mobile}),
            ...(email && {email:email}),
            ...(password && {password : hashPassword})    

        })

        return response.json({
            message: "Cập nhật thông tin thành công",
            error: false,
            success: true,
            data: updateUser
        });
    }catch(error){
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}
    