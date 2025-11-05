import {RegisterDto} from './Seller.dto.js';
import {SellerService} from './Seller.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class SellerController {
  async register(req, res) {
    try {
      const manufacturer = await new SellerService().register(new RegisterDto(req.body), req.file, req.user.id);
      return successResponse(res, manufacturer, 'Seller registered successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}