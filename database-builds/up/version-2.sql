-- BASIC PHOTOGRAPH STORAGE



CREATE TABLE albums (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title varchar(100) NOT NULL,
    category varchar(100) default 'photos',
	date varchar(100) NOT NULL,
    -- unix date?
    -- curated order    
    description varchar(200),
    album_uuid UUID UNIQUE NOT NULL default uuid_generate_v4(),
    timestamp timestamptz NOT NULL default now()
);

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

-- PHOTOS
-- insert into albums(title, date, description) VALUES ('concrete cosmos, 'summer 2014', 'here are my favorite raccons from the summer of 2014. enjoy their odd ways.', 'photos');
-- insert into albums(title, date, description) VALUES ('ground rules', 'winter 2012', 'japanese gardens make my heart sing.', 'photos');
-- insert into albums(title, date, description) VALUES ('night night', 'now', 'this is my face', 'photos');



insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    '',
    '',
    '',
    ''
);

--- OBJECTS!!
insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'objects',
    'A New Map',
    'London, 2014',
    'A New Map. Clearing space for new directions.'
);
insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'objects',
    'CHAIR',
    'London, 2013',
    'A disassembled and reassembled chair from the street.'
);
insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'objects',
    'The Temple of Interdependency',
    'London, 2013',
    'A Cardboard Castle.'
);
insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'objects',
    'Repair Chairs',
    'London, 2013',
    'Street repairs on East London Cast-Offs'
);

-- SOCIAL 

insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'social',
    'ART CAMP',
    'London, 2015',
    'Art Camp. Collaboration with Beatrice Vermeir.'
);

insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'social',
    'ROAM',
    'London, 2015',
    'ROAM (Research on a Mission). Proposal for an Unrealised Nomadic Art Studio.'
);

insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'social',
    'SOUP',
    'London, 2015',
    'Collaboration with Beatrice Vermeir.'
);


-- VIDEOS 


insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'videos',
    'Diptych 3',
    'Providence, Rhode Island, 2012',
    'Amtrak Journeys and Grocery Store Blurs.'
);

insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'videos',
    'Lucifer, I went to the Ocean',
    'London, 2016',
    'Collaboration with Laura Burns.'
);

insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'videos',
    'Following a Line.',
    'London, 2015',
    'Compilation of street footage.'
);


-- WRITING

insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'writing',
    'Sweeten the Deal',
    'London, 2016',
    'Poetry booklet.'
);

insert into albums (
    category,
    title,
    date,
    description
) VALUES (
    'writing',
    'Goods Inward',
    'London, 2016',
    'Poetry booklet.'
);

 id |             title             |              album_uuid              | category 
----+-------------------------------+--------------------------------------+----------
  4 | concrete cosmos               | 07306f1a-bb91-4990-b1e1-51ec0e2b0343 | photos
  5 | ground rules                  | 4f3fc495-4c8b-4781-8fa8-ddba7445530e | photos
  6 | night night                   | 916c8eae-33cd-4e62-af07-3ab3e97b26e3 | photos
  7 | shape speak                   | 49b54d10-eef5-4a05-bdc9-7339184a3ebf | photos
  9 | 1-54                          | b0df9cc1-7fab-4b2d-9f03-cd73fb182c0d | dreams
 10 | 55-72                         | 6905a43a-afe5-440b-bf2d-7fca2353ba71 | dreams
 11 | 73-84                         | c61250c9-db68-479d-8d3e-b26051b0394e | dreams
 12 | GO                            | 6495bf1f-9740-495c-8944-fb66b066cd8b | movement
 14 | A New Map                     | eb5631c4-0734-4c75-97fa-02cb4428a65f | objects
 15 | CHAIR                         | 256133d7-fcd2-4acc-ad97-718d5e13d3f2 | objects
 16 | The Temple of Interdependency | 5b7420c1-a297-4e42-a132-59940975c091 | objects
 17 | Repair Chairs                 | 24ef8505-0328-4904-9842-fc1b03324dc0 | objects
 18 | ART CAMP                      | 56d6c64e-a786-40fe-bb57-0f4865bdc735 | social
 19 | ROAM                          | 52af825b-cdf3-4e2b-8f06-edbd8f4b050e | social
 20 | SOUP                          | ed5b8c70-7599-4899-b876-0154eec56a61 | social
 21 | Diptych 3                     | 9488d4d5-2db1-4bc2-889c-5112bd84a577 | videos
 22 | Lucifer, I went to the Ocean  | cf9207b0-e96c-41c0-b9a0-8ebcb81dd0bd | videos
 23 | Following a Line.             | e5c9a862-9b52-4513-aa24-3badc8ca20c8 | videos
 24 | Sweeten the Deal              | 6e743053-d679-445f-9b7f-8c964bf6c03d | writing
 25 | Goods Inward                  | ecb3ba23-bc2b-49d5-b5b8-66e28e2b34d1 | writing
 26 | We Sell Boxes and Bubble Wrap | 884e8467-cced-4425-8dde-eab5211c858d | writing
