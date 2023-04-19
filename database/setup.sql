DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;

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

INSERT INTO users (user_id, username, email, password)
VALUES
    ('8f12021e-e81c-4d2c-a13f-047649583090','John', 'john.doe@example.com', 'password'),
    ('3832b520-edf8-4745-8662-fa3c136871ff','Jane', 'jane.smith@example.com', 'password'),
    ('ea640b9b-b9e5-4e05-aeb8-61c4eebfaf5d','Bob', 'bob.johnson@example.com', 'password');

INSERT INTO notes (title, content, summary, user_id)
VALUES
    ('How to Bake a Cake', 'Baking a cake is easier than you think. Here are the steps...', 'Baking', '8f12021e-e81c-4d2c-a13f-047649583090'),
    ('The Best Hikes in the Mountains', 'If you love hiking and are looking for new trails to explore, check out these top picks...', 'Hiking', '3832b520-edf8-4745-8662-fa3c136871ff'),
    ('Tips for Working from Home', 'Working from home can be a challenge, but with these tips and tricks...', 'Work', 'ea640b9b-b9e5-4e05-aeb8-61c4eebfaf5d');
