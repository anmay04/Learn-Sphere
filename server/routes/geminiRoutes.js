
const express = require("express");
const router = express.Router();
const { generateResponse } = require("../controllers/geminiController");

router.post("/chat", generateResponse);

module.exports = router;