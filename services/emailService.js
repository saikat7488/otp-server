const transporter = require("../config/transporter.js");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

const emailService = {
  create: async ({ to }) => {
    const otp = generateOTP();
    const expire = Date.now() + 2 * 60 * 1000; // OTP valid for 2 minutes
    const userName = to.split("@")[0];

    const subject = "Your One-Time Password (OTP)";
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              padding: 20px;
            }
            .container {
              background-color: #fff;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              font-size: 24px;
              color: #4CAF50;
            }
            .otp {
              font-size: 36px;
              font-weight: bold;
              color: #FF5722;
              text-align: center;
              margin: 20px 0;
            }
            .footer {
              font-size: 14px;
              text-align: center;
              color: #888;
            }
            .highlight {
              color: #FF5722;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your One-Time Password (OTP)</h1>
            </div>
            <p>Hello, <span>${userName}</span></p>
            <p>Your One-Time Password (OTP)</p>
            <div class="otp">
              <strong>${otp}</strong>
            </div>
            <p>This OTP is valid for <strong>2 minutes</strong>. Please do not share it with anyone.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
            <div class="footer">
              <p>Best regards,</p>
              <p>Your Company Team</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to,
        subject,
        html, // Using HTML content
      });

      return { message: "OTP sent successfully!", otpKey: otp, expire, info };
    } catch (error) {
      console.error("Email sending failed:", error); // Log the actual error
      return { message: "Error sending OTP", error: error.message || error };
    }
  },
};

module.exports = emailService;
