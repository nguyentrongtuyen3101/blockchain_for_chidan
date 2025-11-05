import { ClientException } from '../../utils/errors.js';

export class RegisterDto {
  constructor(data) {
    this.name = data.name?.trim();
    this.email = data.email?.toLowerCase();
    this.password = data.password;
    this.validate();
  }

  validate() {
    if (!this.name || this.name.length < 2) throw new ClientException('Name must be at least 2 characters', 400);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) throw new ClientException('Invalid email format', 400);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) throw new ClientException('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',400);
  }
}
export class LoginDto {
  constructor(data) {
    this.email = data.email?.toLowerCase();
    this.password = data.password;

    this.validate();
  }

  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) throw new ClientException('Invalid email format', 400);
    if (!this.password) throw new ClientException('Password is required', 400);
  }
}

export class SendResetPasswordDto {
  constructor(data) {
    this.email = data.email?.toLowerCase();
    this.validate();
  }

  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) throw new ClientException('Invalid email format', 400);
  }
}

export class ResetPasswordDto {
  constructor(data) {
    this.password = data.password;
    this.validate();
  }

  validate() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) throw new ClientException('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',400);
  }
}

export class RegisterFactoryDto {
  constructor(data) {
    this.taxId = data.taxId;
    this.email = data.email?.toLowerCase();
    this.password = data.password;
    this.name= data.name;
  }
  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) throw new ClientException('Invalid email format', 400);
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) throw new ClientException('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',400);
    if (!this.taxId) throw new ClientException('Tax ID is required', 400);
    if (!this.name || this.name.length < 2) throw new ClientException('Factory name must be at least 2 characters', 400);
  }
}
