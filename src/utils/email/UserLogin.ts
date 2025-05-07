import nodemailer from "nodemailer";
import Otp from "../../models/Otp";
const SendUserOtp = async (email: string, name: string) => {
  try {
    //first delete otp
    let deleteotp = await Otp.deleteMany({ email: email });
    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtp = new Otp({ email, otp });
    await newOtp.save();
    //send email
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL, //
        pass: process.env.EMAIL_PASS, //
      },
    });
    console.log("Email:", process.env.EMAIL);
    console.log(process.env.EMAIL_PASS);
    const info = await transporter.sendMail({
      from: '"Zaalima Test Login" <team@zaalima.in>', // sender address
      to: `${email}`, // recipient
      subject: "Your Zaalima OTP is Here – Login Access for Test", // subject line
      text: "Use the OTP below to securely log in to Zaalima Test Panel.", // plain text
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #f0f4f8;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .email-wrapper {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background: linear-gradient(135deg, #4b6cb7, #182848);
          padding: 30px;
          text-align: center;
          color: #ffffff;
        }
        .email-header h1 {
          margin: 0;
          font-size: 24px;
        }
        .email-body {
          padding: 30px;
          color: #333333;
        }
        .email-body p {
          font-size: 16px;
          margin: 15px 0;
        }
        .otp-box {
          background: #4b6cb7;
          color: #ffffff;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 3px;
          padding: 15px;
          text-align: center;
          border-radius: 8px;
          margin: 20px 0;
        }
        .email-footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #888;
        }
        .email-footer a {
          color: #4b6cb7;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .email-body {
            padding: 20px;
          }
          .otp-box {
            font-size: 24px;
            padding: 12px;
          }
        }
      </style>
    </head>
    <body>
    
      <div class="email-wrapper">
        <div class="email-header">
          <h1>Zaalima Test Login Access</h1>
        </div>
        <div class="email-body">
          <p>Hi ${name},</p>
          <p>Welcome to Zaalima! Please use the following One-Time Password (OTP) to securely access the test panel:</p>
    
          <div class="otp-box">
            ${otp}
          </div>
    
          <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
          <p>If you did not initiate this login request, kindly ignore this email or contact our support team immediately.</p>
        </div>
        <div class="email-footer">
          &copy; 2025 Zaalima. All rights reserved. <br/>
          Need help? <a href="mailto:support@zaalima.in">support@zaalima.in</a>
        </div>
      </div>
    
    </body>
    </html>`,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (err) {
    console.error("Error sending otp:", err);
    return false;
  }
};
export default SendUserOtp;
