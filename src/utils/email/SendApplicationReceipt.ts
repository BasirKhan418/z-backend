import nodemailer from "nodemailer";

const SendApplicationReceipt = async (
  email: string,
  name: string,
  domain: string,
  duration: string,
  link: string
) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Zaalima HR" <hr@zaalima.in>',
      to: `${email}`,
      subject:
        "We’ve Received Your Internship Application at Zaalima Development",
      text: `Hey ${name}, thanks for applying to the ${domain} internship at Zaalima Development!`,
      html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            background: #f4f6f8;
            color: #2d3748;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: #1a202c;
            padding: 20px;
            text-align: center;
          }
          .header img {
            max-height: 60px;
          }
          .header h1 {
            color: #f7fafc;
            font-size: 24px;
            margin-top: 10px;
          }
          .content {
            padding: 30px;
          }
          .content h2 {
            color: #2b6cb0;
            font-size: 22px;
            margin-bottom: 10px;
          }
          .content p {
            line-height: 1.6;
            margin-bottom: 16px;
          }
          .info-box {
            background: #ebf8ff;
            padding: 15px 20px;
            border-left: 4px solid #3182ce;
            border-radius: 6px;
            margin-bottom: 20px;
          }
          .steps {
            margin-top: 20px;
          }
          .step {
            margin-bottom: 12px;
          }
          .step span {
            background: #2b6cb0;
            color: white;
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            text-align: center;
            line-height: 24px;
            margin-right: 10px;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #718096;
            background: #f7fafc;
          }
          .btn {
            display: inline-block;
            margin-top: 20px;
            background: #2b6cb0;
            color: #fff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://res.cloudinary.com/dfgibb5to/image/upload/v1746358262/zaalifgm_bvmmz6.png" alt="Zaalima Development Logo" />
            <h1>Zaalima Development</h1>
          </div>
          <div class="content">
            <h2>Hey ${name},</h2>
            <p>We’re thrilled to let you know that we’ve received your application for the <strong>${domain} Internship</strong> at Zaalima Development.</p>
    
            <div class="info-box">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Domain:</strong> ${domain}</p>
              <p><strong>Duration:</strong> ${duration}</p>
            </div>
    
            <p>Here's what to expect next:</p>
            <div class="steps">
              <div class="step"><span>1</span> Screening of your profile and resume</div>
              <div class="step"><span>2</span> Shortlisted candidates will receive a short task or assessment</div>
              <div class="step"><span>3</span> Final onboarding email and offer letter for selected candidates</div>
            </div>
    
            <p>We appreciate your interest and are excited to review your profile. You’ll hear from us within 5–7 business days.</p>
    
            <a class="btn" href="https://zaalima.in/">Visit Our Website</a>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Zaalima Development. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (err) {
    console.error("Error sending application receipt:", err);
    return false;
  }
};

export default SendApplicationReceipt;
