const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const sendEmail = async (req, res) => {
  const { email, subject, message, name, phone } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL, // Your Gmail email address
      pass: process.env.SMTP_PASS, // Your Gmail password or an application-specific password
    },
  });

  const mailOptions = {
    from: email, // Use your Gmail email address here
    to: process.env.SMTP_EMAIL, // Use the recipient's email address from the request body
    subject: `You have Email from: ${email} subject is ${subject}`,
    html: `<b>Company Name: </b> ${name}
    <br/>
    <b>Company Email: </b> ${email}
    <br/>
    <b>Phone number: </b> ${phone}
    <br/>
    <b>Description: </b> ${message}`,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({
    success: true,
    message: "Email sent",
  });
};

app.post("/api/sendEmail", sendEmail);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
