import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  user: process.env.DB_USER || "3Bgvs23vnS7Fryk.root",
  password: process.env.DB_PASSWORD || "2VzU89z9Y1M92dlj",
  database: process.env.DB_NAME || "test",
  port: parseInt(process.env.DB_PORT || "4000", 10),
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
