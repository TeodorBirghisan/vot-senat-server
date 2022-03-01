import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { SecurityModule } from '../security/security.module';
import { UserModule } from '../user/user.module';
import { InvitationController } from './invitation.controller';
import { Invitation } from './invitation.entity';
import { InvitationGuard } from './invitation.guard';
import { InvitationService } from './invitation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    SecurityModule,
    MailModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [InvitationService, InvitationGuard],
  controllers: [InvitationController],
  exports: [InvitationGuard, InvitationService],
})
export class InvitationModule {}
