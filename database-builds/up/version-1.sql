CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE test (
    id BIGSERIAL PRIMARY KEY NOT NULL,
	test varchar(100) default 'this is a test',
    test_uuid UUID UNIQUE NOT NULL default uuid_generate_v4(),
    date timestamptz NOT NULL default now()
);