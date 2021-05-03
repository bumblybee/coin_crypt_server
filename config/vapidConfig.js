const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:hesstjune@gmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

exports.sendNotification = async (sub, payload) => {
  await webpush.sendNotification(sub, payload);
};
