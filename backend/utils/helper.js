import nodemailer from "nodemailer";

const emailTransporter = function () {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shailesh.respond@gmail.com",
      pass: process.env.GMAIL_APP_PASS,
    },
  });
  return transporter;
};

export { emailTransporter };
