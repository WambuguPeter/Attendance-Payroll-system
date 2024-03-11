import sql from "mssql";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

const {
  SQL_USER,
  SQL_PASSWORD,
  SQL_SERVER,
  SQL_DB,
  SQL_SERVER_PORT,
  SQL_ENCRYPT,
  SQL_TRUST_SERVER_CERTIFICATE,
} = process.env;

const sqlConfig = {
  user: SQL_USER,
  password: SQL_PASSWORD,
  server: SQL_SERVER,
  database: SQL_DB,
  port: Number(SQL_SERVER_PORT),
  options: {
    encrypt: Boolean(SQL_ENCRYPT), // true for azure & false for local dev,
    trustServerCertificate: Boolean(SQL_TRUST_SERVER_CERTIFICATE), // true for local dev & false for azure
  },
};

let appPool;

const connectToDatabase = async () => {
  try {
    appPool = await sql.connect(sqlConfig);
    if (appPool) {
      logger.info("Connected to SQL Server");
    }
  } catch (error) {
    logger.error("Error connecting to SQL Server", error);
  }
};

const closePool = async () => {
  try {
    await sql.close();
    logger.info("Connection to SQL Server closed");
  } catch (error) {
    logger.error("Error closing SQL Server connection", error);
  }
};

export { connectToDatabase, closePool, sql };
