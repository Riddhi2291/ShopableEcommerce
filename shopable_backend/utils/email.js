const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const pug = require('pug');
const { emailTemplete } = require('../views/emailTemplate');

module.exports = class Email {
  constructor(date, from, to, cc, tasks) {
    this.date = `${date}`;
    this.to = to;
    this.from = from;
    this.cc = cc;
    this.tasks = tasks;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async sendDSR(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/emailTemplate.pug`, {
      date: this.date,
      tasks: this.tasks,
    });

    // let html = emailTemplete(this.date, this.tasks);

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      cc: this.cc,
      subject: `DSR : ${this.date}`,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
};
