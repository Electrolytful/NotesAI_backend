DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 (),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(155) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE notes(
    notes_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY (notes_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
