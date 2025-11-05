import {CreateProductDto} from './product.dto.js';
import {ProductService} from './product.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ProductController {
  async createProduct(req, res) {
    try {
      const product = await new ProductService().createProduct(new CreateProductDto(req.body), req.user.id, req.file);
      return successResponse(res, product, 'Product created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}