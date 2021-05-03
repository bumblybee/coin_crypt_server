var express = require("express");
var router = express.Router();
const { Notification, User } = require("../db");
const { Op } = require("sequelize");
const { sendNotification } = require("../config/vapidConfig");
const axios = require("axios");

// setInterval(getPrice, 240000)

const getPrice = async (coin) => {
  const price = await axios.get(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DOGE,LTC,XLM,ADA&tsyms=USD`
  );

  const data = price.data;
  const coinPrices = {
    BTC: data.BTC.USD,
    ETH: data.ETH.USD,
    DOGE: data.DOGE.USD,
    LTC: data.LTC.USD,
    XLM: data.XLM.USD,
    ADA: data.ADA.USD,
  };

  await sendAllNotifications(coinPrices);
};

// getPrice();

const sendAllNotifications = async (coinPrices) => {
  for (const coin in coinPrices) {
    const notifications = await Notification.findAll({
      where: {
        [Op.and]: [
          {
            coin,
            notifyValue: { [Op.gt]: coinPrices[coin] },
          },
        ],
      },
      include: User,
    });

    notifications.forEach(async (notification) => {
      console.log(notification.coin);
      const title = "CryptCoin Price Alert";
      const body = `${notification.coin} price below ${notification.notifyValue}`;

      const payload = JSON.stringify({ title, body });
      console.log(payload);
      await sendNotification(notification.user.subscription, payload);
    });
  }
};

function upsert(values, condition) {
  return Notification.findOne({ where: condition }).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return Notification.create(values);
  });
}

router.post("/notify", async (req, res) => {
  const { coin, notifyVal } = req.body;
  const userId = 1;
  const notifyValue = notifyVal;

  //TODO: Get user from client or jwt

  const record = await upsert({ coin, userId, notifyValue }, { coin, userId });
  await getPrice();

  res.status(200).json(record);
});

module.exports = router;
