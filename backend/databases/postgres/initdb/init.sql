CREATE DATABASE traccar;
CREATE DATABASE traccartest;

\c traccartest

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password) VALUES
('johnsmith', 'johnsmith@example.com', 'hashed_password_1'),
('emilyjones', 'emilyjones@example.com', 'hashed_password_2'),
('alexbrown', 'alexbrown@example.com', 'hashed_password_3'),
('lisawilson', 'lisawilson@example.com', 'hashed_password_4'),
('michaeladams', 'michaeladams@example.com', 'hashed_password_5');

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location GEOGRAPHY(Point, 4326)
);

INSERT INTO places (name, location) VALUES
    ('Eiffel Tower', ST_GeogFromText('POINT(48.858844 2.294351)')),
    ('Statue of Liberty', ST_GeogFromText('POINT(40.689247 -74.044502)')),
    ('Great Wall of China', ST_GeogFromText('POINT(40.431908 116.570374)')),
    ('Machu Picchu', ST_GeogFromText('POINT(-13.163068 -72.545128)')),
    ('Christ the Redeemer', ST_GeogFromText('POINT(-22.951916 -43.210487)'));
