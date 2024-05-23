import nodemailer from "nodemailer";

// Sends an email using Nodemailer.
const sendEmail = async (options) => {
  // Create a transporter using Nodemailer with SMTP configuration
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b366e65d637e5b",
      pass: "ed722b9b3dfc01",
    },
  });

  // Configure email options including sender, recipient, subject, and message
  const mailOptions = {
    from: "", // Sender's email address (can be left empty for default behavior)
    to: options.email, // Recipient's email address
    subject: options.subject, // Email subject
    text: options.message, // Email body
  };

  // Send the email using the configured transporter
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
