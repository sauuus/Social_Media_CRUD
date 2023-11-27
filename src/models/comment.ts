// dist/models/userModel.js
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/database.js";
import userModel from "./user.js";
import { Post } from "./post.js";

export const Comment = sequelize.define(
  "comment",
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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      columnName: "post_id",
      references: {
        model: Post,
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
    tableName: "comment",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
