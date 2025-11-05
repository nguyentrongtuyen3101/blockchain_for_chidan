import prisma from '../../../prisma/client.js'; 
import { ServerException ,ClientException} from '../../../utils/errors.js';
import cloudinary from '../../../config/cloudinary.js';
import { unlink } from 'fs/promises';

export class ProductService {
  async createProduct(data, userId,file) {
    const tempPath = file?.path;
    try{
      if(!(await prisma.user.findUnique({where:{id:userId}}))) throw new ServerException('Tài Khoản người dùng không tồn tại', 404);
      const manufacturer = await prisma.manufacturer.findFirst({where:{userId:userId}});
      if(!manufacturer) throw new ClientException('Chỉ nhà sản xuất mới có thể tạo sản phẩm', 403);
      if(manufacturer.status !== 'approved') throw new ClientException('Tài khooan doanh nghiệp chưa được phê duyệt', 403);
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
          product: { connect: { id: newProduct.id } },
          actionType: 'CREATED',
          user: { connect: { id: userId } },
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
