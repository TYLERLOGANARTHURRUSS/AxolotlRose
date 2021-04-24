//VARCHAR(size)	A VARIABLE length string (can contain letters, numbers, and special characters). The size parameter specifies the maximum column length in characters - can be from 0 to 65535

//CREATE TABLE weather (
//   city    varchar(80),
//   temp_lo int
// )

const userTableString = 
`CREATE TABLE users (
    user_id   INT AUTO_INCREMENT,
    username  VARCHAR(250) NOT NULL,
    password  VARCHAR(250) NOT NULL,
    lastname  VARCHAR(250),
    firstname VARCHAR(250),
    piclink   VARCHAR(1000),
    location  VARCHAR(120),
    PRIMARY KEY (user_id)
  )`

const bookTableString = 
`CREATE TABLE books (
    id      INT AUTO_INCREMENT PRIMARY KEY,  
    title   VARCHAR(250) NOT NULL,
    author  VARCHAR(250) NOT NULL,
    userid  VARCHAR(250) NOT NULL
)`


const messageTableString = 
`CREATE TABLE messages
  id      INT AUTO_INCREMENT PRIMARY KEY,
  to      INT NOT NULL,
  from    INT NOT NULL,
  message VARCHAR(1000),
  read    BOOL
`