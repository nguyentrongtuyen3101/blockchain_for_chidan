import { Router } from 'express';
import { ServiceCenterController } from '../../../modules/Business/ServiceCenter/ServiceCenter.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';

const router = Router();
router.post('/register', upload.single('businessLicenseFile'), new ServiceCenterController().register);

export default router;