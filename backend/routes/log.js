const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN
router.post("/", async (req, res) => {
  let { stack, level, packageName, message } = req.body;

  // Truncate packageName to 48 characters if it's longer
  if (packageName.length > 48) {
    packageName = packageName.substring(0, 48);
  }

  // Truncate message to 48 characters if it's longer
  if (message.length > 48) {
    message = message.substring(0, 48);
  }

  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    res.status(200).json({ logID: response.data.logID });
  } catch (error) {
    console.error("Failed to send log:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send log" });
  }
});


module.exports = router;
