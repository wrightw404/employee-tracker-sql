const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'JESUITlax22',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
  );
  
//create prompt