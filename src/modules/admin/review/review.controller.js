import {ReviewService} from './review.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ReviewController {
  async approveBusinessAccount(req, res) {
    try {
      const business = await new ReviewService().ApproveBusinessAccount(req.params.businessId);
      return successResponse(res, business, 'Business account approved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}