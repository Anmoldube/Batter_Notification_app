const batteryLevel = require("battery-level");
const nodemailer = require("nodemailer");

// Define email settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com", // Replace with your email
    pass: "your_password", // Replace with your app password
  },
});

// Function to send email
const sendEmail = () => {
  const mailOptions = {
    from: "your_email@gmail.com",
    to: "recipient_email@gmail.com", // Replace with recipient's email
    subject: "Low Battery Alert",
    text: "Your battery is at or below 20%. Please charge it soon!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Function to check battery level
const checkBatteryLevel = async () => {
  try {
    const level = await batteryLevel();
    console.log(`Current battery level: ${level * 100}%`);

    // If battery is 20% or below, send an email
    if (level * 100 <= 20) {
      console.log("Battery is at or below 20%, sending an alert...");
      sendEmail();
    }
  } catch (error) {
    console.error("Error fetching battery level:", error);
  }
};

// Check battery level every 10 seconds
setInterval(checkBatteryLevel, 10000); // Check every 10 seconds

// Check battery level when the script starts
checkBatteryLevel();
