import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { SecurityModule } from '../security/security.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { ForgotPasswordGuard } from './forgotPassword.guard';
import { InvitationController } from './invitation.controller';
import { Invitation } from './invitation.entity';
import { InvitationGuard } from './invitation.guard';
import { InvitationService } from './invitation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    SecurityModule,
    MailModule,
    UserRoleModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [InvitationService, InvitationGuard, ForgotPasswordGuard],
  controllers: [InvitationController],
  exports: [InvitationGuard, InvitationService, ForgotPasswordGuard],
})
export class InvitationModule {}
