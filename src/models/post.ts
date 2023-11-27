// dist/models/userModel.js
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/database.js";
import userModel from "./user.js";

export const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      columnName: "user_id",
      references: {
        model: userModel,
        key: "id",
      },
    },
    likeCount: {
      type: DataTypes.INTEGER,
      columnName: "like_count",
      defaultValue: 0,
      allowNull:false,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   field: "created_at",
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   field: "updated_at",
    // },
    // deletedAt: {
    //   type: DataTypes.BOOLEAN,
    //   field: "deleted_at",
    // },
  },
  {
    tableName: "post",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
