import prisma from '../../../prisma/client.js'; 
import { ServerException ,ClientException} from '../../../utils/errors.js';
import cloudinary from '../../../config/cloudinary.js';
import { unlink } from 'fs/promises';

export class ManufacturerService {
  async register(data, file, userId) {
    const tempPath = file?.path;
    try{
      if(!(await prisma.user.findUnique({where:{id:userId}}))) throw new ServerException('Tài Khoản người dùng không tồn tại', 404);
      if(await prisma.manufacturer.findFirst({where: { taxId: data.taxId } }) && await prisma.seller.findFirst({where: { taxId: data.taxId } }) && await prisma.serviceCenter.findFirst({where: { taxId: data.taxId } })) throw new ClientException('Mã số thuế này đã được đăng ký', 400);
      if(!file) throw new ClientException('Giấy tờ xác thực doanh nghiệp là bắt buộc', 400);
      let fileUrl ;
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'business',
          resource_type: 'raw',  
          access_mode: 'public',
        });
        fileUrl = result.secure_url;
      } catch (err) {
        throw new ServerException('Upload file xác minh thất bại', 500);
      }

      await unlink(file.path).catch(() => {});
      const newManufacturer = await prisma.manufacturer.create({
        data: {
          companyName: data.companyName,
          address: data.address,
          taxId: data.taxId,
          businessLicenseFile: fileUrl,
          userId: userId
        }
      });
      return newManufacturer;
    }finally {
      if (tempPath) await unlink(tempPath).catch(() => {});
    }
  }

  async createProduct(data, userId,file) {
    const tempPath = file?.path;
    try{
      if(!(await prisma.user.findUnique({where:{id:userId}}))) throw new ServerException('Tài Khoản người dùng không tồn tại', 404);
      const manufacturer = await prisma.manufacturer.findFirst({where:{userId:userId}});
      if(!manufacturer) throw new ClientException('Chỉ nhà sản xuất mới có thể tạo sản phẩm', 403);
      if(await prisma.product.findFirst({where: { serialNumber: data.serialNumber } })) throw new ClientException('Số serial này đã được đăng ký', 400);
      if(!file) throw new ClientException('Ảnh mô tả sản phẩm là bắt buộc', 400);
      let fileUrl ;
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });
        fileUrl = result.secure_url;
      } catch (err) {
        throw new ServerException('Upload ảnh mô tả sản phẩm thất bại', 500);
      }

      await unlink(file.path).catch(() => {});
      const newProduct = await prisma.product.create({
        data: {
          serialNumber: data.serialNumber,
          name: data.name,
          price: data.price,
          manufactureDate: data.manufactureDate,
          manufacturerId: manufacturer.id,
          productImage: fileUrl
        }
      });
      const newProductHistory = await prisma.productHistory.create({
        data: {
          productId: newProduct.id,
          actionType: 'CREATED',
          performedById: userId,
          description: `Hành động CREATE được thực hiện bởi nhà sản xuất ${manufacturer.companyName}`
        }
      });
      const newApprovalRequest = await prisma.approvalRequest.create({
        data: {
          productId: newProduct.id,
          productHistoryId: newProductHistory.id,
          action:'CREATED',
          status: 'OPEN',
          description: `Yêu cầu phê duyệt hành động CREATE sản phẩm với số serial ${newProduct.serialNumber} từ nhà sản xuất ${manufacturer.companyName}`
        }
      });
      return { newProduct,newProductHistory,newApprovalRequest };
    }finally {
      if (tempPath) await unlink(tempPath).catch(() => {});
    }
  }
}
