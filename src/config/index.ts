import dotenv from "dotenv";
dotenv.config();

export const db = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_POST,
  name: process.env.DB_NAME,
  
};
