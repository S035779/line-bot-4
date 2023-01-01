"use strict";

const line = require("@line/bot-sdk");
const express = require("express");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const app = express();

app.get("/", (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!"
  })
});

app.get("/broadcast", (_, res) => {
  broadcastMessage()
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get("/message/:uid", (req, res) => {
  pushMessage(req.params.uid)
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


app.post("/bot/webhook", line.middleware(config), (req, res) => {
  console.dir(req.body, { depth: 10, colors: true });
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function broadcastMessage() {
  const message = { type: "text", text: "ブロードキャストメッセージです！" };
  return client.broadcast(message);
}

function pushMessage(userId) {
  const message = { type: "text", text: "プッシュメッセージです！"}
  return client.pushMessage(userId, message);
}

function followMessage(token, username) {
  const message = { type: "text", text: `${username}さん、こんにちは！` };
  return client.replyMessage(token, message);
};

function sendMessage(token, echo) {
  const message = { type: "text", text: echo };
  return client.replyMessage(token, message);
};

function joinMessage(token, groupname) {
  const message = { type: "text", text: `${groupname}へ、ようこそ！` };
  return client.replyMessage(token, message);
};

function handleEvent(event) {
  if (event.type === "follow") {
    return client.getProfile(event.source.userId)
      .then(profile => followMessage(event.replyToken, profile.displayName));
  }

  if (event.type === "message" && event.message.type === "text") {
    return sendMessage(event.replyToken, "これは、これは");
  }

  if (event.type === "join" && event.source.type === "group") {
    return client.getGroupSummary(event.source.groupId)
      .then(summary => joinMessage(event.replyToken, summary.groupName));
  }

  return Promise.resolve(null);
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
