CREATE DATABASE open_avenues_calculator;

CREATE USER 'open_avenues'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tester';

GRANT ALL ON open_avenues_calculator.* TO 'open_avenues'@'localhost';

USE open_avenues_calculator;

CREATE TABLE signing_bonuses (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  amount INT,
  slug VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE job_postings (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  amount INT,
  slug VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE recruiter_fees (
  id INT auto_increment PRIMARY KEY,
  discipline VARCHAR(255),
  percentage INT,
  amount INT,
  salary INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE employee ( /* SHOULD NAME BE ADDED? */
  id INT auto_increment PRIMARY KEY,
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


