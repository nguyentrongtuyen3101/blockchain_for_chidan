import prisma from '../../../prisma/client.js'; 
import { ServerException } from '../../../utils/errors.js';

export class ReviewService {
  async ApproveBusinessAccount(businessId) {
    let modelName;
    let roleUsser;
    if (await prisma.manufacturer.findUnique({ where: { id: businessId } })) 
    {
      modelName = 'manufacturer';
      roleUsser='MANUFACTURER';
    }
    else if (await prisma.seller.findUnique({ where: { id: businessId } })) 
    {
      modelName = 'seller';
      roleUsser='SELLER';
    }
    else if (await prisma.serviceCenter.findUnique({ where: { id: businessId } })) 
    {
      modelName = 'serviceCenter';
      roleUsser='SERVICE_CENTER';
    }
    else throw new ServerException('Tài khoản doanh nghiệp không tồn tại', 404);
    const updatedBusiness = await prisma[modelName].update({
      where: { id: businessId },
      data: { status: 'approved' },
    });
    const user = await prisma.user.update({
      where: { id: updatedBusiness.userId },
      data: {
        roles: {
          push: roleUsser,
        },
      },
    });
    return {updatedBusiness,user};
  }
}
