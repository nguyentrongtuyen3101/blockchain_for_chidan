import { ClientException } from '../../../utils/errors.js';

export class RegisterDto {
  constructor(data) {
    this.companyName = data.companyName?.trim();
    this.address = data.address?.trim();
    this.taxId = data.taxId?.trim();
    this.validate();
  }

  validate() {

    if (!this.companyName || this.companyName.length < 3) throw new ClientException('Tên công ty phải có ít nhất 3 ký tự', 400);
    if (this.address && this.address.length < 5) throw new ClientException('Địa chỉ không hợp lệ (phải có ít nhất 5 ký tự)', 400);

    const taxRegex = /^[0-9]{10}$/; 
    if (!this.taxId || !taxRegex.test(this.taxId)) throw new ClientException('Mã số thuế phải gồm 10 chữ số hợp lệ', 400);  
  }
}

export class CreateProductDto {
  constructor(data) {
    this.serialNumber = data.serialNumber?.trim();
    this.name = data.name?.trim();
    this.price = parseFloat(data.price);
    this.manufactureDate = data.manufactureDate ? new Date(data.manufactureDate) : null;

    this.validate();
  }

  validate() {
    if (!this.serialNumber || this.serialNumber.length < 3) {
      throw new ClientException('Số serial của sản phẩm phải có ít nhất 3 ký tự', 400);
    }

    if (!this.name || this.name.length < 3) {
      throw new ClientException('Tên sản phẩm phải có ít nhất 3 ký tự', 400);
    }

    if (isNaN(this.price) || this.price <= 0) {
      throw new ClientException('Giá sản phẩm phải là một số dương hợp lệ', 400);
    }
    if (!this.manufactureDate || isNaN(this.manufactureDate.getTime())) {
      throw new ClientException('Ngày sản xuất không hợp lệ', 400);
    }

    const today = new Date();
    if (this.manufactureDate > today) {
      throw new ClientException('Ngày sản xuất không được lớn hơn ngày hiện tại', 400);
    }
  }
}
