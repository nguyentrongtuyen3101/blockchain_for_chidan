import {RegisterDto} from './ServiceCenter.dto.js';
import {ServiceCenterService} from './ServiceCenter.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ServiceCenterController {
  async register(req, res) {
    try {
      const manufacturer = await new ServiceCenterService().register(new RegisterDto(req.body), req.file, req.user.id);
      return successResponse(res, manufacturer, 'ServiceCenter registered successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}