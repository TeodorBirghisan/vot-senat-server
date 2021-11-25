import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { SecurityToken } from './security-token.entity';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(SecurityToken)
    private securityTokenRepository: Repository<SecurityToken>,
  ){}

  async checkToken(token: string, ): Promise<boolean> {
    const securityToken:SecurityToken = await this.securityTokenRepository.findOne({
      where: { token }
    });

    return securityToken !== null && securityToken !== undefined;
  }

  //TODO bcrypt the token so that it is not visible in the database
  async createToken(user: User): Promise<string> {
    const token: string = Math.random().toString(36).slice(2, 10);
    
    const securityToken: SecurityToken = this.securityTokenRepository.create({
      token,
      user
    });

    await this.securityTokenRepository.save(securityToken);

    return token;
  }
}
