import { Router } from 'express';
import { SellerController } from '../../../modules/Business/Seller/Seller.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';

const router = Router();
router.post('/register', upload.single('businessLicenseFile'), new SellerController().register);

export default router;