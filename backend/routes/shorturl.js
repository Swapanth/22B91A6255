const express = require("express");
const axios = require("axios");
const router = express.Router();
const log = require("../middlewares/logger");

const shortUrls = new Map();

const generateShortcode = () => Math.random().toString(36).substring(2, 8);

router.post("/shorturls", async (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url || typeof url !== "string") {
    await log("backend", "error", "handler", "invalid or missing URL");
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  const code = shortcode || generateShortcode();

  if (shortUrls.has(code)) {
    await log("backend", "error", "handler", "Shortcode collision");
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const expiryTime = new Date(
    Date.now() + (validity || 30) * 60000
  ).toISOString();

  shortUrls.set(code, {
    url,
    expiry: expiryTime,
    createdAt: new Date().toISOString(),
    clickCount: 0,
    clicks: [],
  });

  await log("backend", "info", "service", `Shortlink created for ${url}`);

  res.status(201).json({
    shortLink: `http://localhost:7000/${code}`,
    expiry: expiryTime,
  });
});

router.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;
  const data = shortUrls.get(shortcode);

  if (!data) {
    await log("backend", "error", "handler", `Shortlink ${shortcode} not found`);
    return res.status(404).send("Shortlink not found");
  }

  if (new Date() > new Date(data.expiry)) {
    await log("backend", "warn", "handler", `Shortlink ${shortcode} expired`);
    return res.status(410).send("Shortlink expired");
  }

  // Get client IP address
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

  let location = "unknown";

  try {
    const geoRes = await axios.get(
      `http://api.ipapi.com/${clientIp}?access_key=a25f396cc81993173cb29f1bba8598d8&fields=ip,country_name`
    );
    location = geoRes.data.country_name || "unknown";
  } catch (error) {
    console.error("Geolocation lookup failed:", error.message);
  }

  // Update click count and history
  data.clickCount += 1;
  data.clicks.push({
    timestamp: new Date().toISOString(),
    ip: clientIp,
    source: req.headers.referer || "direct",
    location: location
  });

  await log("backend", "info", "handler", `Redirecting shortcode ${shortcode} to ${data.url}`);
  res.redirect(data.url);
});




router.get("/shorturls/:shortcode", async (req, res) => {
  const { shortcode } = req.params;
  const data = shortUrls.get(shortcode);

  if (!data) {
    await log("backend", "error", "handler", `Shortlink ${shortcode} not found for stats`);
    return res.status(404).send("Shortlink not found");
  }

  await log("backend", "info", "handler", `Stats fetched for ${shortcode}`);

  res.status(200).json({
    url: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.clickCount,
    clickDetails: data.clicks
  });
});



module.exports = router;
