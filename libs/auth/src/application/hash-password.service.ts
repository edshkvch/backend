import { Injectable, Scope } from '@nestjs/common';
import crypto from 'crypto';

@Injectable({ scope: Scope.REQUEST })
export class HashPasswordService {
  public async compare(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [hashedPasswordSalt, key] = hashedPassword.split(':');

      return crypto.scrypt(password, hashedPasswordSalt, 64, (error, derivedKey) => {
        if (error) {
          reject(error);

          return;
        }

        return resolve(key == derivedKey.toString('hex'));
      });
    });
  }

  public async hash(password: string): Promise<string> {
    const salt = crypto.randomBytes(8).toString('hex');

    return new Promise((resolve, reject) => {
      return crypto.scrypt(password, salt, 64, (error, derivedKey) => {
        if (error) {
          reject(error);

          return;
        }

        return resolve(salt + ':' + derivedKey.toString('hex'));
      });
    });
  }
}
