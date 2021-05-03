"use strict";

const Sequelize = require("sequelize");

const UserModel = require("./models/user.js");
const NotificationModel = require("./models/notification.js");

const env = process.env.NODE_ENV || "development";

let sequelize;

// Environment config
if (env !== "production") {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    { dialect: "postgres", logging: false, port: 5433 }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

// Link models to db
const User = UserModel(sequelize, Sequelize);
const Notification = NotificationModel(sequelize, Sequelize);

// Relationships
User.hasMany(Notification);
Notification.belongsTo(User);

// Authenticate db and log connection/error
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error:" + err));

module.exports = {
  sequelize,
  Sequelize,
  User,
  Notification,
};
