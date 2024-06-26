const express = require("express");
const router = express.Router();
const path = require("path");

const basePath = path.join(__dirname, "../templates");

router.get("/app", (req, res) => {
  res.sendFile(`${basePath}/app.html`);
});

router.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

module.exports = router;
