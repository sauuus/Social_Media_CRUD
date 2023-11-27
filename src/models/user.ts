// dist/models/userModel.js
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/database.js";

const userModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
        },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      columnName: "created_at", 
    },
    updatedAt: {
      type: DataTypes.DATE,
      columnName: "updated_at", 
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default userModel;
