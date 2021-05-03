"use strict";
// TODO: add trail drafts

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "username",
      },
      subscription: {
        type: DataTypes.JSONB,
        field: "subscription",
        unique: true,
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
    { tableName: "user" }
  );
  return User;
};
