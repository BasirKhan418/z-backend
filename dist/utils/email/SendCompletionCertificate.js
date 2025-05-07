"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const SendCompletionCertificate = async (email, name, url) => {
    try {
        const encodedUrl = encodeURIComponent(url);
        // Sanitize the filename to replace spaces and special characters
        const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `Internship_Completion_Certificate_${sanitizedName}.pdf`;
        const transporter = nodemailer_1.default.createTransport({
            host: "email-smtp.us-east-1.amazonaws.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            }
        });
        const info = await transporter.sendMail({
            from: '"HR Infotact" <hr@infotactlearning.in>',
            to: `${email}`,
            subject: "Congratulations on Successfully Completing Your Internship!",
            text: "Congratulations on successfully completing your internship at Infotact Solutions!",
            html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body { font-family: Arial, sans-serif; background-color: #f3f4f6; color: #333; }
              .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
              .header { text-align: center; font-size: 24px; color: #2c7be5; }
              .content { padding: 20px; text-align: center; }
              .button { background: #2c7be5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
              .footer { margin-top: 20px; font-size: 14px; color: #666; text-align: center; }
          </style>
      </head>
      <body>
          <div class="container">
              <h2 class="header">Congratulations, ${name}!</h2>
              <div class="content">
                  <p>We are pleased to inform you that you have successfully completed your internship at Infotact Solutions.</p>
                  <p>Your hard work and dedication have been truly commendable, and we are honored to have had you as part of our team.</p>
                  <p>Please find attached your Internship Completion Certificate as a token of appreciation.</p>
                  <a href="${decodeURIComponent(url)}" class="button">Download Certificate</a>
                  <p>If you have any questions, please feel free to contact us at <a href="mailto:support@infotact.in">support@infotact.in</a>.</p>
              </div>
              <div class="footer">
                  Best Regards, <br> HR Team <br> Infotact Solutions
              </div>
          </div>
      </body>
      </html>
      `,
            attachments: [
                {
                    filename: filename,
                    path: decodeURIComponent(url), // Decode for local file system access
                },
            ],
        });
        console.log("Message sent: %s", info.messageId);
        return true;
    }
    catch (err) {
        console.error('Error sending email:', err);
        return false;
    }
};
exports.default = SendCompletionCertificate;
