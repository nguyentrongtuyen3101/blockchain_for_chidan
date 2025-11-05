import { Router } from 'express';
import { ProductController } from '../../../modules/Business/product/product.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';

const router = Router();
router.post('/create', upload.single('productImage'), new ProductController().createProduct);
export default router;