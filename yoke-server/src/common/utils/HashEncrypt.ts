import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config';

class HashAndEncrypt {
  readonly key: string;
  constructor() {
    this.key = config.APP_SECRET;
  }
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  decodeToken(token: string) {
    return jwt.verify(token, this.key);
  }

  generateToken(payload: { id: string; email: string }) {
    return jwt.sign(payload, this.key);
  }
}

export default new HashAndEncrypt();
