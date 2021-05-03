var express = require("express");
var router = express.Router();
const { sendNotification } = require("../config/vapidConfig");

router.post("/", async (req, res) => {
  console.log("hit");

  const sub = req.body;

  res.status(201).json("subscribed");

  const payload = JSON.stringify({
    title: "CoinCrypt Notification",
    body: "Signed up for subscriptions",
  });

  await sendNotification(sub, payload);
});

module.exports = router;
