import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  export async function sendVerificationEmail(email: string, verificationCode: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    };
  
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Error:', error.message);
      } else {
        console.log('✅ Email sent:', info.response);
      }});
  }
