PRAGMA foreign_keys=on;

CREATE TABLE directions(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) );

create table profiles(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30),
	faculty VARCHAR(30),
	direct_id INT,
    FOREIGN KEY (direct_id) REFERENCES directions(id)
);

CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
       species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);