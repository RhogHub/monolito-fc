require('dotenv').config();

module.exports = 
{
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "logging": true
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "logging": true
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "logging": false
  }
}
