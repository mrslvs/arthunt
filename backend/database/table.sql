CREATE TABLE IF NOT EXISTS art_item (
	id SERIAL PRIMARY KEY,
	"name" VARCHAR(256),
	author VARCHAR(128),
	"type" VARCHAR(128),
	imageURL VARCHAR(256),
	image VARCHAR(128),
	height FLOAT,
	width FLOAT,
	searchPhrase VARCHAR(512),
	code VARCHAR(64),
	"found" BOOLEAN
);
-- INSERT INTO art_item ("name", author, "type", imageURL, image, height, width, searchPhrase, code, "found") VALUES ()
-- INSERT INTO art_item ("name", author, "type", imageURL, image, height, width, searchPhrase, code, "found") VALUES ('nazov diela', 'autor diela', 'kresba', 'urlka dlhsia goooogle...etc#$@$>/', 'NAZOV.jpeg', 29.7, 42, 'hladaj ma na ulici a nezabudni sfotit qr kod', 'h45h#', false);