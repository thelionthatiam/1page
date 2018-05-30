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
-- insert into albums(title, date, description) VALUES ('raccoons', 'summer 2014', 'here are my favorite raccons from the summer of 2014. enjoy their odd ways.');
-- insert into albums(title, date, description) VALUES ('gardens', 'winter 2012', 'japanese gardens make my heart sing.');
-- insert into albums(title, date, description) VALUES ('me', 'now', 'this is my face');

CREATE TABLE photos (
    id BIGSERIAL PRIMARY KEY NOT NULL,
	album_uuid UUID REFERENCES albums(album_uuid),
    photo_uuid UUID UNIQUE NOT NULL default uuid_generate_v4(),
    -- unix date?
    -- curated order    
    src varchar(100) NOT NULL, 
    timestamp timestamptz NOT NULL default now()
);

-- DUMMY DATA
-- insert into photos(album_uuid, src) VALUES ('9db85f97-fb05-4554-abf6-07de0b6a4500', '1');
-- insert into photos(album_uuid, src) VALUES ('9db85f97-fb05-4554-abf6-07de0b6a4500', '2');
-- insert into photos(album_uuid, src) VALUES ('9db85f97-fb05-4554-abf6-07de0b6a4500', '3');
-- insert into photos(album_uuid, src) VALUES ('9db85f97-fb05-4554-abf6-07de0b6a4500', '4');
-- insert into photos(album_uuid, src) VALUES ('28439387-e535-4387-ad07-a5e1f2731a2c', '5');
-- insert into photos(album_uuid, src) VALUES ('28439387-e535-4387-ad07-a5e1f2731a2c', '6');
-- insert into photos(album_uuid, src) VALUES ('ce82126f-4716-4778-b8a8-eb9ba6e09cd5', '7');