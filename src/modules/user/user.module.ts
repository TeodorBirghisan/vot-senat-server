import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ParticipationEntry } from '../participation-entry/partitcipation-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ParticipationEntry])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
