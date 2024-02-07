//Dependencies
const inquirer = require('inquirer'); 
const mysql = require('mysql'); 

//Connection happyduck_data
const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: 'password',
    database: "happyduck_data"
  });

//Start the connection
connection.connect((err) => {
    //print the error
    if (err) throw err; 
    console.log("Successfully connected to Happyduck Payroll"); 
}); 
//Drafting the code to give the prompts
inquirer.prompt([
  {
    type: 'list',
    name: 'operation',
    message: 'Select Operation',
    choices: ['View Employees', 'Add Employee', 'Update Employee', 'Delete Employee','View all departments','View all roles','Add a department','Add a role'],
  }

]).then((answers) => {
  switch(answers.operation){
    case 'View Employees':
      viewEmployees(); 
      break;
    case 'Add Employee':
      console.log("TODO: Add Employee");
        break;
    case 'Update Employee':
      console.log("TODO: View Employees");
      break;
    case 'Delete Employee':
      console.log("TODO: Delete Employee");
        break;
    case 'View all departments':
      viewDepartments()
      break;
    case 'View all roles':
      viewRoles(); 
      break;
    case 'Add a department':
      console.log("TODO: Add a department");
      break;
    case 'Add a role':
      console.log("TODO: Add a role");
      break;
  }
}); 

//Sql functions
function viewEmployees(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err; 
    console.table(results); 
  });
}

function viewDepartments(){
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err; 
    console.table(results); 
  });
}

function viewRoles(){
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err; 
    console.table(results); 
  });
}

