const batteryLevel = require("battery-level");
const nodemailer = require("nodemailer");

// Define email settings
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other email services too, like Outlook
  auth: {
    user: "dubea9514@gmail.com", // Replace with your email
    pass: "lpgrsgseviyhteex", // Replace with your email password or app-specific password
  },
});

// Function to send email
const sendEmail = () => {
  const mailOptions = {
    from: "dubea9514@gmail.com",
    to: "anmoldube15@gmail.com",
    subject: "Low Battery Alert",
    text: "Your battery is below 10%. Please charge it soon!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Function to check battery level
const checkBatteryLevel = async () => {
  const level = await batteryLevel();
  console.log(`Current battery level: ${level * 100}%`);

  // If battery is less than 10%, send an email
  if (level * 100 < 40) {
    console.log("Battery is below 10%, sending an alert...");
    sendEmail();
  }
};

// Check battery level every 10 minutes (600000 ms)
setInterval(checkBatteryLevel, 6000); // 10 minutes

// Check battery level when the script starts
checkBatteryLevel();
