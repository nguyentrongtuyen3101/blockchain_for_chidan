import { Router } from 'express';
import { ManufacturerController } from '../../../modules/Business/Manufacturer/Manufacturer.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';

const router = Router();
router.post('/register', upload.single('businessLicenseFile'), new ManufacturerController().register);
router.post('/product', upload.single('productImage'), new ManufacturerController().createProduct);
export default router;