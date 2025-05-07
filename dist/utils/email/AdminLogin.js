"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const Otp_1 = __importDefault(require("../../models/Otp"));
const SendAdminOtp = async (email, name) => {
    try {
        //first delete otp
        let deleteotp = await Otp_1.default.deleteMany({ email: email });
        //generate otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtp = new Otp_1.default({ email, otp });
        await newOtp.save();
        //send email
        const transporter = nodemailer_1.default.createTransport({
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
            from: '"Zaalima Admin" <team@zaalima.in>',
            to: `${email}`,
            subject: "Your Secure OTP for Zaalima Admin Access",
            text: "Use the OTP below to securely log in to Zaalima Admin.",
            html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Zaalima Admin OTP</title>
        <style>
          body {
            background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #fff;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px;
            color: #333;
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
          }
          .header {
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 2px solid #eeeeee;
          }
          .header h1 {
            color: #2c5364;
            font-size: 26px;
            margin-bottom: 5px;
          }
          .content {
            padding-top: 20px;
            font-size: 16px;
            line-height: 1.7;
          }
          .otp-box {
            background-color: #2c5364;
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            padding: 15px;
            margin: 25px auto;
            border-radius: 8px;
            letter-spacing: 5px;
          }
          .cta {
            text-align: center;
            margin-top: 30px;
          }
          .cta a {
            background-color: #2c5364;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-weight: 600;
            display: inline-block;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 13px;
            color: #666;
          }
          .footer a {
            color: #2c5364;
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .container {
              padding: 20px;
            }
            .otp-box {
              font-size: 22px;
              padding: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Zaalima Admin Access</h1>
            <p style="font-size:14px; color:#888;">Secure OTP Login</p>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Welcome to <strong>Zaalima Admin Panel</strong>! To securely log in and access your account, please use the OTP below:</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.</p>
            <p>If you didn't request this login, you can safely ignore this email or report it to us.</p>
            <div class="cta">
              <a href="https://zaalima.in">Go to Zaalima</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2025 Zaalima Development. All rights reserved.</p>
            <p>Need help? Contact us at <a href="mailto:support@zaalima.in">support@zaalima.in</a></p>
          </div>
        </div>
      </body>
      </html>
      `,
        });
        return true;
    }
    catch (err) {
        console.error("Error sending otp:", err);
        return false;
    }
};
exports.default = SendAdminOtp;
