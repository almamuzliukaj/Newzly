const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Newzly" <no-reply@newzly.com>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
