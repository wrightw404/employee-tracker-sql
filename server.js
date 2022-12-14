//import { prompt } from 'inquirer';
const inquirer = require('inquirer');
//import { createConnection } from 'mysql2';
const mysql2 = require('mysql2');
//import consoleTable from 'console.table';
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3002;
//const app = express();

//app.use(express.urlencoded({extended: true}));
//app.us(exress.json());

//require('dotenv').config();

const db = mysql2.createConnection(
    {
        host: 'localhost',
        database: 'employeeTracker_db',
        user: 'root',
        password: 'JESUITlax22',
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
function viewAllDepartments(){
    //query to call all from department and have them ascend based by id 
    db.query(`SELECT * FROM department ORDER BY department_id ASC`, (err, res ) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    })
}
//viewAllRoles function
function viewAllRoles(){
    db.query(`SELECT role.role_id, role.title, role.salary, department.name, department.department_id FROM role JOIN department ON role.department_id = department.department_id ORDER BY role.role_id ASC;`, (err, res) => {
        if (err) throw err; 
        console.table(res);
        startPrompt();
    })
}

function viewAllEmployees(){
    db.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager
    FROM employee manager
    RIGHT JOIN employee ON employee.manager_id = manager.employee_id
    JOIN role ON employee.role_id = role.role_id
    JOIN department ON department.department_id = role.department_id
    ORDER BY employee.employee_id ASC;
    `,
    (err, res) => {
        if (err) throw err; 
        console.table(res);
        startPrompt();
    })
}
//AddADepartment function
function addADepartment(){
    //inquirer prompt
    inquirer.prompt([
        {
            name: 'addDepartment',
            type: 'input',
            message: 'What would you like the name of the Department to be?'
        }
    ]).then((userInput) => {
        db.query(`INSERT INTO department SET ?`, 
        {
            name: userInput.addDepartment
        },
        (err, res) => {
            if(err) throw err;
            console.log(`Congratulations! ${userInput.addDepartment} was added to Departments`)
            startPrompt();
        })
    })
}
//addARole function
function addARole(){
    //select all from departments to display 
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        var allDepartments = res.map(department => ({name: department.name, value: department.department_id}));
    
    inquirer.prompt([
        //role title
        {
            name:'title',
            type:'input',
            message:'Please enter a name for the role'
        },
        //role salary
        {
            name:'salary',
            type:'input',
            message:'Please enter a salary for the role'
        },
        //role department 
        {
            name:'addDepartment',
            type:'rawlist',
            message:'Please enter the Department in which the new role will be in',
            choices: allDepartments
        },
    ]).then((userInput) => {
        db.query(`INSERT INTO role SET ?`, 
        {
            title: userInput.title,
            salary: userInput.salary,
            department_id: userInput.addDepartment
        },
        (err, res) => {
            if (err) throw err; 
            console.log(`Congratulations! A ${userInput.title} role was added to the ${userInput.addDepartment} department`);
            startPrompt();
        })
    })
    })
}
//addAnEmployee function
function addAnEmployee(){
    //select all from roles and employees to display
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        var allRoles = res.map(role => ({name: role.title, value: role.role_id}));
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        var allEmployees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));
    //inquirer prompt
    inquirer.prompt([
        {
            name:'f_Name',
            type:'input',
            message:'Please enter the first name'
        },
        {
            name:'l_Name',
            type:'input',
            message:'Please enter a last name'
        },
        {
            name:'role',
            type:'rawlist',
            message:'Please select a role',
            choices: allRoles
        },
        {
            name:'manager',
            type:'rawlist',
            message:'Please select a manager',
            choices: allEmployees
        }

    ]).then((userInput) => {
        db.query(`INSERT INTO employee SET ?`, {
            first_name: userInput.f_Name,
            last_name: userInput.l_Name,
            role_id: userInput.role,
            manager_id: userInput.manager
        }, (err, res) => {
            if(err) throw err;
            console.log(`Congratulations! Your employee, ${userInput.f_Name}, was added`);
            startPrompt();
        })
    })
    })
    })

}
//updateAnEmployeeRole function
function updateAnEmployeeRole(){
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        var allRoles = res.map(role => ({name: role.title, value: role.role_id}));
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        var allEmployees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));

        inquirer.prompt([
            {
                name:'updateEmployee',
                type:'rawlist',
                message:'Please select which employee you would like to update',
                choices: allEmployees
            },
            {
                name:'updateRole',
                type:'rawlist',
                message:'Please select the new role for the employee',
                choices: allRoles
            }
        ]).then((userInput) => {
            db.query(`UPDATE employee SET ? WHERE ?`, 
            [
                {role_id: userInput.updateRole,},
                {employee_id: userInput.updateEmployee,},
            ],
            (err,res) => {
                if (err) throw err;
                console.log(`Congratulations! The update was successful`);
                startPrompt();
            })
        })
    })
    })
}
