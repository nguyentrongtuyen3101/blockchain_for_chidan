import { ClientException } from '../../../utils/errors.js';

export class RegisterDto {
  constructor(data) {
    this.storeName = data.storeName?.trim();
    this.location = data.location?.trim();
    this.taxId = data.taxId?.trim();
    this.validate();
  }

  validate() {

    if (!this.storeName || this.storeName.length < 3) throw new ClientException('Tên công ty phải có ít nhất 3 ký tự', 400);
    if (this.location && this.location.length < 5) throw new ClientException('Địa chỉ không hợp lệ (phải có ít nhất 5 ký tự)', 400);

    const taxRegex = /^[0-9]{10}$/; 
    if (!this.taxId || !taxRegex.test(this.taxId)) throw new ClientException('Mã số thuế phải gồm 10 chữ số hợp lệ', 400);
    
  }
}