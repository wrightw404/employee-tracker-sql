const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({extended: true}));
app.us(exress.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'JESUITlax22',
      database: 'employeeTracker_db'
    },
    console.log(`Connected to the employeeTracker_db database.`)
  );
  
//create prompt