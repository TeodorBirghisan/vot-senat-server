import { Module } from '@nestjs/common';
import { DATABASE_PROVIDERS } from './database.provider';

@Module({
  providers: [...DATABASE_PROVIDERS],
  exports: [...DATABASE_PROVIDERS],
})
export class DatabaseModule {}
