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

db.connect((err) => {
    if (err) throw err;
    startPrompt();
});

//create prompt
function startPrompt(){
    inquirer.prompt([ 
        { 
            name:'userInput',
            type:'list',
            message:'Welcome to employee tracker, please select what you would like to do',
            choices:['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee(s) Role']
        }
    ])
}
