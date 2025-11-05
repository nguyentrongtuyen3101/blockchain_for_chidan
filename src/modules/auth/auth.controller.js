import { RegisterDto,LoginDto,SendResetPasswordDto,ResetPasswordDto} from './auth.dto.js';
import authService from './auth.service.js';
import { successResponse,errorResponse } from '../../utils/response.js';
import { authCookieOptions,resetPasswordCookieOptions } from '../../config/cookie.config.js';

class AuthController {
  async register(req, res) {
    const user = await authService.register(new RegisterDto(req.body));
    return successResponse(res, user, 'User registered successfully', 201);
  }

  async verifyEmail(req, res) {
    try {
      await authService.verifyEmail(req.query.token);
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
    catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async googleCallback(req, res) {
    try {
      const token = req.user; 
      res.cookie('authToken', token, authCookieOptions);
      return res.redirect(`${process.env.FRONTEND_URL}/home`);
    } catch (err) {
      return errorResponse(res, 'Google login failed', 500);
    }
  }

  async login(req, res) {
    const token = await authService.login(new LoginDto(req.body));
    res.cookie('authToken', token, authCookieOptions);
    return successResponse(res, null, 'Đăng nhập thành công', 200);
  }

  async me(req, res) {
    const user =  await authService.me(req.user.id);
    return successResponse(res, user, 'User profile fetched successfully', 200);
  }
  async sendMailResetPassword(req, res) {
    const resetToken = await authService.sendMailResetPassword(new SendResetPasswordDto(req.body));
    return successResponse(res, resetToken, 'Password reset email sent', 200);
  }

  async redirectResetPassword(req, res) {
    try {
      const { token } = req.query;
      if (!token) return res.status(400).json({ message: 'Missing reset token' });

      res.cookie('reset_token', token, resetPasswordCookieOptions);
      
      return res.redirect(`${process.env.FRONTEND_URL}/reset-password`);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async resetPassword(req, res) {
    const user = await authService.resetPassword(req.query.token, new ResetPasswordDto(req.body));
    return successResponse(res, user, 'Password reset successfully', 200);
  }
}
export default new AuthController();
