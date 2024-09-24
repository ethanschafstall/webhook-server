import mysql from "mysql2/promise";

const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

const dbConfig = {
    host: host,
    port: port,
  user: user,
  password: password,
  database: database
};

const connect = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export const databaseConnectionMiddleware = async (req, res, next) => {
  try {
    req.dbConnection = await connect();
    next();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
