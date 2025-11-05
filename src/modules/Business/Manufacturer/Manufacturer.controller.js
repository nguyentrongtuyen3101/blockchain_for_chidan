import {RegisterDto,CreateProductDto} from './Manufacturer.dto.js';
import {ManufacturerService} from './Manufacturer.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ManufacturerController {
  async register(req, res) {
    try {
      const manufacturer = await new ManufacturerService().register(new RegisterDto(req.body), req.file, req.user.id);
      return successResponse(res, manufacturer, 'Manufacturer registered successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }

  async createProduct(req, res) {
    try {
      const product = await new ManufacturerService().createProduct(new CreateProductDto(req.body), req.user.id, req.file);
      return successResponse(res, product, 'Product created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}