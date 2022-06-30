import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { google } from 'googleapis';

import * as dotenv from 'dotenv';

dotenv.config();

const OAuth2 = google.auth.OAuth2;

const ouath2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
);

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_ADDRESS,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: async () => await ouath2Client.getAccessToken(),
          tls: {
            rejectUnauthorized: false,
          },
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
