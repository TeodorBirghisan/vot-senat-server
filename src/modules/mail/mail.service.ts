import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Invitation } from '../invitation/invitation.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: Invitation) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Unitbv Senat!',
      template: 'invitation',
      context: {
        invitationToken: token.invitationToken,
      },
    });
  }

  async sendForgotPasswordToken(email: string, token: Invitation) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot Password Token',
      template: 'forgotPassword',
      context: {
        forgotPasswordToken: token.invitationToken,
      },
    });
  }
}
