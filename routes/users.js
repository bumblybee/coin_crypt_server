var express = require("express");
var router = express.Router();
const { User } = require("../db");

router.post("/", async (req, res) => {
  const { username } = req.body.userDetails;
  const { subscription } = req.body;
  const userRecord = await User.create({ username, subscription });

  res.status(201).json(userRecord);
});

router.post("/login", async (req, res) => {
  const { username } = req.body;

  const userRecord = await User.findOne({ where: username });

  res.status(201).json(userRecord);
});

module.exports = router;
