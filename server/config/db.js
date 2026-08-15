import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const isCloudDb = process.env.DB_HOST && process.env.DB_HOST.includes("tidbcloud.com");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test",
  port: Number(process.env.DB_PORT) || (isCloudDb ? 4000 : 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: (process.env.DB_SSL === "true" || isCloudDb)
    ? { minVersion: "TLSv1.2", rejectUnauthorized: true }
    : undefined,
});

export default pool.promise();