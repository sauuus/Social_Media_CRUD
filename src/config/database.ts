import { Sequelize } from "@sequelize/core";
import { db } from "./index.js";

const sequelize = new Sequelize(db.name!, db.username!, db.password, {
  dialect: "postgres",
  host: db.host,
  port: db.port,
});
export default sequelize;
