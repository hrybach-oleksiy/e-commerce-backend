const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation on ${process.env.CLIENT_URL}`,
      text: '',
      html: `
              <div>
                <h1>Account Activation</h1>
                <p>Hello,</p>
                <p>To activate your account, please click the link below:</p>
                <a href="${link}">${link}</a>
                <p>If you did not request this activation, please ignore this email.</p>
                <p>Thank you!</p>
              </div>
            `,
    });
  }
}

module.exports = new MailService();
