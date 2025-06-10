const nodemailer = require('nodemailer');

// Function to send emails using nodemailer with Ethereal SMTP (for testing)
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,  // Ethereal user from environment variables
      pass: process.env.ETHEREAL_PASS,  // Ethereal password from environment variables
    },
  });

  // Send the email with the given parameters
  await transporter.sendMail({
    from: `"Newzly" <no-reply@newzly.com>`, // Sender info
    to,       // Recipient email address
    subject,  // Email subject
    html,     // Email body as HTML
  });
};

module.exports = sendEmail; // Export the function
