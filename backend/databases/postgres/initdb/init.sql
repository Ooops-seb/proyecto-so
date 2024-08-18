CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO users (username, email) VALUES ('admin', 'admin@example.com');
