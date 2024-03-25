
import React from 'react';

const WelcomeEmail = ({ firstName, lastName, email, password, supportEmail }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Our Platform!</title>
        <style>
          {/* Add your custom styles here */}
          {`
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
            .credentials {
              margin-top: 20px;
            }
            .credentials p {
              margin: 5px 0;
            }
            .cta-button {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #999;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1>Welcome to Our Platform!</h1>
          <p>Dear {firstName} {lastName},</p>
          <p>We are thrilled to welcome you to our platform. You are now part of our community!</p>
          <div className="credentials">
            <p>Your login credentials:</p>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
          </div>
          <p>You can now login to our platform using the provided credentials.</p>
          {/* <a href={loginURL} className="cta-button">Login Now</a> */}
          <p className="footer">If you have any questions or need assistance, feel free to contact us at {supportEmail}.</p>
        </div>
      </body>
    </html>
  );
};

export default WelcomeEmail;
