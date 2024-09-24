CREATE DATABASE IF NOT EXISTS webhook_server_db;

USE webhook_server_db;

CREATE TABLE t_users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password CHAR(100) NOT NULL,
	salt VARCHAR(400) NOT NULL,
);
