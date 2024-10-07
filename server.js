const batteryLevel = require("battery-level");
const nodemailer = require("nodemailer");

// Define email settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dubea9514@gmail.com",
    pass: "lpgrsgseviyhteex",
  },
});

// Function to send email
const sendEmail = () => {
  const mailOptions = {
    from: "dubea9514@gmail.com",
    to: "anmoldube15@gmail.com",
    subject: "Low Battery Alert",
    text: "Your battery is at or below 20%. Please charge it soon!",
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
  try {
    const level = await batteryLevel(); // Using Promises
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

// Check battery level every 10 minutes
setInterval(checkBatteryLevel, 6000); // 10 minutes

// Check battery level when the script starts
checkBatteryLevel();
