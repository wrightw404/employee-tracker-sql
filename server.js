import { prompt } from 'inquirer';
import { createConnection } from 'mysql';
import consoleTable from 'console.table';

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({extended: true}));
app.us(exress.json());

require('dotenv').config();

const db = createConnection(
    process.env.DB.NAME,
    process.env.DB.USER,
    process.env.DB.PASSWORD,
    {
      host: 'localhost',
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
    prompt([ 
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
function viewAllDepartments(){

}
//viewAllRoles function
function viewAllRoles(){

}
//viewAllEmployees function
function viewAllEmployees(){

}
//AddADepartment function
function addADepartment(){

}
//addARole function
function addARole(){

}
//addAnEmployee function
function addAnEmployee(){

}
//updateAnEmployeeRole function
function updateAnEmployeeRole(){

}
