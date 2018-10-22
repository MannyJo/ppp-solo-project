CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR (80) NOT NULL,
    user_email VARCHAR (100) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "group" (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR (100) NOT NULL,
    user_id INTEGER REFERENCES "user"(id)
);

CREATE TABLE friend (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    group_id INTEGER REFERENCES "group"(id),
    friend_name VARCHAR (80) NOT NULL,
    friend_email VARCHAR (100) NOT NULL
);

CREATE TABLE "event" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    title VARCHAR (100) NOT NULL,
    start_date DATE DEFAULT now(),
    end_date DATE NOT NULL,
    message TEXT,
    secret_message TEXT,
    address TEXT,
    lng VARCHAR (30),
    lat VARCHAR (30),
    img_url VARCHAR (300)
);

CREATE TABLE event_friend (
	event_id INTEGER REFERENCES "event"(id),
	friend_id INTEGER REFERENCES friend(id),
	attend_cd INTEGER /* 0:NO, 1:YES, 2:DON'T KNOW */
);