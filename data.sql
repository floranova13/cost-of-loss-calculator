DROP DATABASE openAvenues;

CREATE DATABASE openAvenues;

CREATE USER 'openAvenues'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tester';

GRANT ALL ON openAvenues.* TO 'openAvenues'@'localhost';

USE openAvenues;

CREATE TABLE signingBonuses (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  amount INT,
  slug VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE jobPostings (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  amount INT,
  slug VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE recruiterFees (
  id INT auto_increment PRIMARY KEY,
  discipline VARCHAR(255),
  percentage INT,
  amount INT,
  salary INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE calculatorEntries (
  id INT auto_increment PRIMARY KEY,
  nameFirst VARCHAR(255),
  nameLast VARCHAR(255),
  periodStart DATE,
  periodEnd DATE,
  occupationalSpecialty VARCHAR(255),
  jobTitle VARCHAR(255),
  laborCode INT,
  annualSalary INT,
  hourlySalary INT,
  degree VARCHAR(255),
  externalCorporateRecruiter TINYINT,
  signOnBonus TINYINT,
  relocationBonus TINYINT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);


