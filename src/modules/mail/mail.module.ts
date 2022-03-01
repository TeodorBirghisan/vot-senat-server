import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASS,
        },
        logger: true,
      },
      defaults: {
        from: process.env.EMAIL_ADDRESS,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
