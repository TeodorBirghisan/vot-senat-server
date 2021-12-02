import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../security/security.module';
import { InvitationController } from './invitation.controller';
import { Invitation } from './invitation.entity';
import { InvitationGuard } from './invitation.guard';
import { InvitationService } from './invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), SecurityModule],
  providers: [InvitationService, InvitationGuard],
  controllers: [InvitationController],
  exports: [InvitationGuard, InvitationService],
})
export class InvitationModule {}
