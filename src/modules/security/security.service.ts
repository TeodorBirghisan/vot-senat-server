import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
  private static _TOKENS: string[] = [];

  checkToken(token: string): boolean {
    return SecurityService._TOKENS.includes(token);
  }

  createToken(): string {
    const token: string = Math.random().toString(36).slice(2, 10);
    SecurityService._TOKENS.push(token);
    return token;
  }
}
