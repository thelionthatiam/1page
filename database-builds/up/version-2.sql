-- BASIC PHOTOGRAPH STORAGE



CREATE TABLE albums (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title varchar(100) NOT NULL,
	date varchar(100) NOT NULL,
    -- unix date?
    -- curated order    
    description varchar(200),
    album_uuid UUID UNIQUE NOT NULL default uuid_generate_v4(),
    timestamp timestamptz NOT NULL default now()
);

-- DUMMY DATA
-- insert into albums(title, date, description) VALUES ('raccons', 'summer 2014', 'here are my favorite raccons from the summer of 2014. enjoy their odd ways.');
-- insert into albums(title, date, description) VALUES ('gardens', 'winter 2012', 'japanese gardens make my heart sing.');
-- insert into albums(title, date, description) VALUES ('me', 'now', 'this is my face');

CREATE TABLE photos (
    id BIGSERIAL PRIMARY KEY NOT NULL,
	album_uuid UUID REFERENCES albums(album_uuid),
    photo_uuid UUID UNIQUE NOT NULL default uuid_generate_v4(),
    -- unix date?
    -- curated order    
    photo varchar(100) NOT NULL, 
    timestamp timestamptz NOT NULL default now()
);

-- DUMMY DATA
-- insert into photos(album_uuid, photo) VALUES ('ddcf7c75-71b7-48d5-8c79-6709ff5e9a57', '1');
-- insert into photos(album_uuid, photo) VALUES ('ddcf7c75-71b7-48d5-8c79-6709ff5e9a57', '2');
-- insert into photos(album_uuid, photo) VALUES ('ddcf7c75-71b7-48d5-8c79-6709ff5e9a57', '3');
-- insert into photos(album_uuid, photo) VALUES ('ddcf7c75-71b7-48d5-8c79-6709ff5e9a57', '4');
-- insert into photos(album_uuid, photo) VALUES ('3cb17067-a76c-4bfa-b811-0bc5c972818e', '5');
-- insert into photos(album_uuid, photo) VALUES ('3cb17067-a76c-4bfa-b811-0bc5c972818e', '6');
-- insert into photos(album_uuid, photo) VALUES ('c7f56698-a428-41c1-a492-fe2ee003571b', '7');