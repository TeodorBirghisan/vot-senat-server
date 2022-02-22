import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthJwtService } from './auth-jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthJWTController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.jwtSecret,
      signOptions: { expiresIn: process.env.expiresIn },
    }),
  ],
  controllers: [AuthJWTController],
  providers: [AuthJwtService, JwtStrategy],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
