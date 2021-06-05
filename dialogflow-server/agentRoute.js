// agentRoute.js
require("dotenv").config();

const express = require("express");
const Dialogflow = require("@google-cloud/dialogflow");
const { uuid } = require("uuid");
const Path = require("path");

const app = express();

app.post("/text-input", async (req, res) => {
  const { message } = req.body;

  // Create a new session
  const sessionClient = new Dialogflow.SessionsClient({
    keyFilename: Path.join(__dirname, "E:/chatbot/chatbot_dialogflow.json"),
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.PROJECT_ID,
    uuid()
  );

  // The dialogflow request object
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
      },
    },
  };

  // Sends data from the agent as a response
  try {
    const responses = await sessionClient.detectIntent(request);
    res.status(200).send({ data: responses });
  } catch (e) {
    console.log(e);
    res.status(422).send({ e });
  }
});

module.exports = app;
