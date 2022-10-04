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
            choices:
            [
            'View All Departments', 
            'View All Roles', 
            'View All Employees', 
            'Add A Department', 
            'Add A Role', 
            'Add An Employee', 
            'Update An Employee(s) Role',
            'Exit'
            ]
        }
    ]).then((answer) => {
        switch(answer.userInput){
            case 'View All Departments':
                viewAllDepartments();
                break;

            case 'View All Roles':
                viewAllRoles();
                break;
            
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'Add A Department':
                addADepartment();
                break;
            
            case 'Add A Role':
                addARole();
                break;
            
            case 'Add An Employee':
                addAnEmployee();
                break;

            case 'Update An Employee(s) Role':
                updateAnEmployeeRole();
                break;
            
            case 'Exit':
                db.end();
                break;
        }
    })
}

//viewAllDepartments function

//viewAllRoles function

//viewAllEmployees function

//AddADepartment function

//addARole function

//addAnEmployee function

//updateAnEmployeeRole function

//exitFunction Function 
