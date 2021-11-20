import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [
    AuthModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
