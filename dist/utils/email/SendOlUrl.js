"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const SendOlUrl = async (email, name, url, score, id) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedId = encodeURIComponent(id);
    const sanitizedFilename = name.replace(/[^a-zA-Z0-9]/g, "_") + ".pdf";
    try {
        let url1 = `${process.env.PUBLIC_HOST}/employe?id=${id} `;
        const transporter = await nodemailer_1.default.createTransport({
            host: "email-smtp.us-east-1.amazonaws.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL, //
                pass: process.env.EMAIL_PASS, //
            },
        });
        const info = await transporter.sendMail({
            from: '"HR Zaalima " <hr@zaalima.in>', // sender address
            to: `${email}`, // list of receivers
            subject: "Congratulations on Your Selection for Internship at Zaalima Development!", // Subject line
            text: "Congratulations on Your Selection for Internship at Zaalima Development!", // plain text body
            html: `
             <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        :root {
            color-scheme: light dark;
        }

        body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            color: #333;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background-color: #1a1a1a;
                color: #e0e0e0;
            }
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        @media (prefers-color-scheme: dark) {
            .email-container {
                background: #2d2d2d;
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
            }
        }

        .banner {
            width: 100%;
            height: 150px;
            background: url('https://res.cloudinary.com/dctl2uywt/image/upload/v1737121956/unnamed_jv5jwa.jpg') center/cover no-repeat;
        }

        h1 {
            font-size: 1.8rem;
            color: #2c7be5;
            margin-bottom: 15px;
        }

        @media (prefers-color-scheme: dark) {
            h1 {
                color: #4d9fff;
            }
        }

        .content {
            padding: 20px;
        }

        p {
            line-height: 1.6;
            margin: 10px 0;
        }

        .button-container {
            text-align: center;
            margin: 20px 0;
        }

        .accept-button {
            display: inline-block;
            background-color: #2c7be5;
            color: #ffffff !important; /* Force white text in both modes */
            padding: 12px 25px;
            text-decoration: none;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 50px;
            transition: background-color 0.3s, transform 0.2s;
        }

        .accept-button:hover {
            background-color: #1a5bb8;
            transform: translateY(-2px);
            color: #ffffff !important; /* Maintain white text on hover */
        }

        @media (prefers-color-scheme: dark) {
            .accept-button {
                background-color: #4d9fff;
            }
            .accept-button:hover {
                background-color: #3d8fee;
            }
        }

        ul {
            margin: 10px 0 20px;
            padding-left: 20px;
        }

        ul li {
            margin: 8px 0;
        }

        .footer {
            background-color: #f7f9fc;
            text-align: center;
            padding: 15px;
            font-size: 0.9rem;
            color: #666;
        }

        @media (prefers-color-scheme: dark) {
            .footer {
                background-color: #222222;
                color: #999;
            }
        }

        a {
            color: #2c7be5;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        @media (prefers-color-scheme: dark) {
            a {
                color: #4d9fff;
            }
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 1.5rem;
            }

            .accept-button {
                font-size: 0.9rem;
                padding: 10px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="banner"></div>
        <div class="content">
            <h1>Congratulations, ${name}!</h1>
            <p>We are delighted to inform you that you have successfully cleared the baseline test with an excellent score of <strong>${score}%</strong>. Congratulations on your achievement and your selection for the internship program at Infotact Solutions as an Associate Developer.</p>
            <p>We are thrilled to have you join our team and look forward to your contributions and growth during this internship. Please find attached your official internship offer letter for your review. The letter includes details about your role, responsibilities, and other relevant information.</p>
            <div class="button-container">
                <a href=${url1} class="accept-button" target="_blank">Accept Offer</a>
            </div>
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Review the Offer Letter: Kindly review the attached PDF carefully to understand the terms and expectations.</li>
                <li>Acknowledgment and Acceptance: Click on the "Accept Offer" button above to confirm your acceptance. You will be directed to a form where you can complete the necessary documentation.</li>
                <li>Sign and Submit the Offer Letter: Sign the attached offer letter and send a scanned copy back to us along with completing the form.</li>
                <li>Timeline: Ensure you complete all the above steps within 3 days of receiving this email.</li>
            </ul>
            <p>Prepare for Final Induction: Once the form is submitted, get yourself ready for the final induction program. Details regarding the induction will be shared shortly.</p>
            <p>If you have any questions or require further clarification, please do not hesitate to reach out to us at <a href="mailto:support@infotact.in">support@infotact.in</a> | +91 9124936538.</p>
            <p>We are excited to have you as part of our team and are confident that this opportunity will be both rewarding and enriching for you.</p>
        </div>
        <div class="footer">Best regards,<br>Jyotirmayee Behera<br>Human Resource Manager<br>Infotact Solutions<br><a href="mailto:support@infotact.in">support@infotact.in</a></div>
    </div>
</body>
</html>
            `, // HTML body
            attachments: [
                {
                    filename: sanitizedFilename,
                    path: decodeURIComponent(url), // Decode the URL for local file system access
                    // href: encodedUrl // Use encoded URL for S3 access
                },
            ],
        });
        console.log("Message sent: %s", info.messageId);
        return true;
    }
    catch (err) {
        console.error("Error sending otp:", err);
        return false;
    }
};
exports.default = SendOlUrl;
