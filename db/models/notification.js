"use strict";

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
    {
      coin: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "coin",
      },
      notifyValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "notify_value",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
    { tableName: "notification" }
  );
  return Notification;
};
