import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(user, token) {
  const verifyUrl = `${process.env.APP_URL}/auth/verify?token=${token}`;
  const cancelUrl = `${process.env.APP_URL}/auth/cancel?token=${token}`;

  const html = `
  
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm Your TrustChain Account</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: linear-gradient(rgba(0, 146, 152, 0.85), rgba(0, 146, 152, 0.85)),
                  url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1920&q=80') no-repeat center center fixed;
      background-size: cover;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      max-width: 800px;
      margin: auto;
      padding: 40px;
      background: rgba(255, 255, 255, 0.98);
      border-radius: 12px;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      position: relative;
      animation: fadeIn 0.7s ease-out;
      border: 1px solid #e0e0e0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }

    .header img {
      max-height: 90px;
      margin-bottom: 20px;
      border-radius: 16px;
      transition: transform 0.3s ease;
    }

    .header img:hover {
      transform: scale(1.05);
    }

    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.6px;
      color: #111827;
    }

    .header h1 span:first-child {
      color: #009298; /* Chữ T */
    }

    p {
      color: #1f2937;
      font-size: 17px;
      line-height: 1.8;
      margin: 20px 0;
    }

    .btn {
      display: inline-block;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      margin: 12px 10px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 0 15px rgba(0, 146, 152, 0.3);
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 146, 152, 0.4);
    }

    .btn-confirm {
      background: linear-gradient(135deg, #009298, #00b3b8);
      color: white !important;
    }

    .btn-cancel {
      background: linear-gradient(135deg, #ffffff, #f3f4f6);
      color: #111827 !important;
      border: 1px solid #d1d5db;
    }

    .footer {
      font-size: 14px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
      text-align: center;
      margin-top: 40px;
    }

    .highlight {
      color: #009298;
      font-weight: 600;
    }

    .timer {
      font-size: 15px;
      color: #4b5563;
      text-align: center;
      margin: 28px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      animation: pulse 2s infinite;
    }

    .timer::before {
      content: '⏳';
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    @media (max-width: 480px) {
      .container {
        padding: 24px;
      }
      .header h1 {
        font-size: 26px;
      }
      .btn {
        display: block;
        margin: 16px auto;
        width: fit-content;
        padding: 14px 32px;
      }
      p {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.pinimg.com/736x/fa/eb/a1/faeba1ac95a922f8c9cd7b7fcf86b28b.jpg" alt="TrustChain Logo" />
      <h1><span>T</span>rustChain</h1>
    </div>

    <p>Hello <span class="highlight">${user.name}</span>,</p>
    <p>
      Welcome to <span class="highlight">TrustChain</span> — the blockchain-powered platform for verified electronic products.  
      Please confirm your email address to activate your account and start tracking product authenticity and ownership securely.
    </p>

    <div style="text-align: center; margin: 36px 0;">
      <a href="${cancelUrl}" class="btn btn-cancel">Cancel</a>
      <a href="${verifyUrl}" class="btn btn-confirm">Confirm Account</a>
    </div>

    <p class="timer">
      This verification link will expire in <b>30 days</b>.
    </p>

    <div class="footer">
      This is an automated message. Please do not reply.<br/>
      If you didn’t create an account on TrustChain, you can safely ignore this email.
    </div>
  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"TrustChain System" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'Xác nhận tài khoản TrustChain',
    html,
  });
}

export async function sendResetPasswordEmail(user, token) {
  const resetUrl = `${process.env.APP_URL}/auth/redirect-reset-password?token=${token}`;
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your TrustChain Password</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: linear-gradient(rgba(0, 146, 152, 0.85), rgba(0, 146, 152, 0.85)),
                  url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1920&q=80') no-repeat center center fixed;
      background-size: cover;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      max-width: 800px;
      margin: auto;
      padding: 40px;
      background: rgba(255, 255, 255, 0.98);
      border-radius: 12px;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      position: relative;
      animation: fadeIn 0.7s ease-out;
      border: 1px solid #e0e0e0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }

    .header img {
      max-height: 90px;
      margin-bottom: 20px;
      border-radius: 16px;
      transition: transform 0.3s ease;
    }

    .header img:hover {
      transform: scale(1.05);
    }

    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.6px;
      color: #111827;
    }

    .header h1 span:first-child {
      color: #009298;
    }

    p {
      color: #1f2937;
      font-size: 17px;
      line-height: 1.8;
      margin: 20px 0;
    }

    .btn {
      display: inline-block;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      margin: 12px 10px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 0 15px rgba(0, 146, 152, 0.3);
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 146, 152, 0.4);
    }

    .btn-reset {
      background: linear-gradient(135deg, #009298, #00b3b8);
      color: white !important;
    }

    .footer {
      font-size: 14px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
      text-align: center;
      margin-top: 40px;
    }

    .highlight {
      color: #009298;
      font-weight: 600;
    }

    @media (max-width: 480px) {
      .container {
        padding: 24px;
      }
      .header h1 {
        font-size: 26px;
      }
      .btn {
        display: block;
        margin: 16px auto;
        width: fit-content;
        padding: 14px 32px;
      }
      p {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.pinimg.com/736x/fa/eb/a1/faeba1ac95a922f8c9cd7b7fcf86b28b.jpg" alt="TrustChain Logo" />
      <h1><span>T</span>rustChain</h1>
    </div>

    <p>Hello <span class="highlight">${user.name}</span>,</p>
    <p>
      You requested to reset your TrustChain password. Click the button below to securely set a new password for your account.
    </p>

    <div style="text-align: center; margin: 36px 0;">
      <a href="${resetUrl}" class="btn btn-reset">Reset Password</a>
    </div>

    <p class="timer">
      This reset link will expire in <b>15 minutes</b>.
    </p>

    <div class="footer">
      This is an automated message. Please do not reply.<br/>
      If you didn’t request a password reset, you can safely ignore this email.
    </div>
  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"TrustChain System" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'Reset your TrustChain password',
    html,
  });
}
