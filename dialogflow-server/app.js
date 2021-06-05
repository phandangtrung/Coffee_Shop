const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use("/api/agent", Routes);

app.listen(PORT, () => console.log(`🔥  server running on port ${PORT}`));

app.post("/text-input", (req, res) => {
  res.status(200).send({ data: "TEXT ENDPOINT CONNECTION SUCCESSFUL" });
});

app.post("/voice-input", (req, res) => {
  res.status(200).send({ data: "VOICE ENDPOINT CONNECTION SUCCESSFUL" });
});

module.exports = app;
