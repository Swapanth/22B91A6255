const express = require("express");
const app = express();
const shortUrlRoutes = require("./routes/shorturl");
const logRoutes = require("./routes/log");
//dot env
require("dotenv").config();



const cors = require("cors");

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


app.use("/", shortUrlRoutes);
app.use("/log", logRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API for Vercel
module.exports = app;
