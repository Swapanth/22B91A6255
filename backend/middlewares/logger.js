const axios = require("axios");
require("dotenv").config();


const ACCESS_TOKEN = process.env.ACCESS
const log = async (stack, level, packageName, message) => {
  try {
    // Ensure all string fields are within 48 character limit
    const truncatedMessage = message && message.length > 48 ? message.substring(0, 48) : message || '';
    const truncatedPackage = packageName && packageName.length > 48 ? packageName.substring(0, 48) : packageName || '';
    
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: truncatedPackage,
        message: truncatedMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    console.log(`Log sent: ${response.data.logID}`);
  } catch (error) {
    console.error("Failed to send log:", error.response?.data || error.message);
  }
};

module.exports = log;
