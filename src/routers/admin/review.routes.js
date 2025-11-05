import { Router } from 'express';
import { ReviewController } from '../../modules/admin/review/review.controller.js';

const router = Router();
router.post('/approve-business/:businessId', new ReviewController().approveBusinessAccount);
export default router;