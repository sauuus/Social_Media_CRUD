// dist/models/userModel.js
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/database.js";
import userModel from "./user.js";
import { Comment } from "./comment.js";

export const Reply = sequelize.define(
  "reply",
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
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      columnName: "comment_id",
      references: {
        model: Comment,
        key: "id",
      },
    },
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

  {
    tableName: "reply",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
