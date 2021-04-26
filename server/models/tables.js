//VARCHAR(size)	A VARIABLE length string (can contain letters, numbers, and special characters). The size parameter specifies the maximum column length in characters - can be from 0 to 65535

//CREATE TABLE weather (
//   city    varchar(80),
//   temp_lo int
// )

//TABLE SCHEMA

const userTableString = 
`CREATE TABLE users (
    user_id   SERIAL PRIMARY KEY,
    username  VARCHAR(250) NOT NULL,
    password  VARCHAR(250) NOT NULL,
    name  VARCHAR(250),
    piclink   VARCHAR(1000),
    location  VARCHAR(120),
    points    INT
  )`

  // INSERT INTO users (username, password, lastname, firstname, piclink, location)
  //   VALUES ('LoganC', 'bigdogsbark', 'COALE', 'LOGAN', 'www.piklink', 'Cold Spring')

const bookTableString = 
`CREATE TABLE books (
    id      SERIAL PRIMARY KEY,  
    title   VARCHAR(250) NOT NULL,
    author  VARCHAR(250) NOT NULL,
    userid  VARCHAR(250) NOT NULL
    isbn    INT
)`


const messageTableString = 
`CREATE TABLE messages (
  id      SERIAL PRIMARY KEY,
  _to      INT NOT NULL,
  _from    INT NOT NULL,
  message VARCHAR(1000),
  read    BOOL
)`

const createSessionTableString =
`CREATE TABLE sessions (

)`