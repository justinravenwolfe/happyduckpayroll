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
function start_app(){
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
        addEmployee(); //Added
        break;
      case 'Update Employee':
        updateEmployee(); //Added
        break;
      case 'Delete Employee':
        deleteEmployee(); 
        break;
      case 'View all departments':
        viewDepartments()
        break;
      case 'View all roles':
        viewRoles(); 
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole(); 
        break;
    }
  }); 
}
//This is going to run the entire app 
start_app(); 
//Sql functions
function viewEmployees(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err; 
    console.table(results); 
  });
  //Goes back to main menu
  start_app(); 
}

function viewDepartments(){
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err; 
    console.table(results); 
  });
   //Goes back to main menu
  start_app(); 
}

function viewRoles(){
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err; 
    console.table(results); 
  });
   //Goes back to main menu
  start_app(); 
}
function addEmployee(){
  inquirer.prompt([
    //Defining all the questions we need to ask the user to add a new employee
    {
      type: 'input',
      name: 'first_name',
      type: 'string',
      message: 'Enter Employee First Name',
    },
    {
      type: 'input',
      name: 'last_name',
      type: 'string',
      message: 'Enter Employee last Name',
    },
    {
      type: 'input',
      name: 'manager_id',
      type: 'int', 
      message: 'Enter Manager ID',
    },
    {
      type: 'input',
      name: 'role_id',
      type: 'int', 
      message: 'Enter Role ID',
    }
    ]).then((answers) => {
      //Insert the new employee into the database
      var query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)'
      connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, results) => {
        if (err) throw err;
        console.log("Employee added successfully");
        start_app(); 
    }); 
  }); 
}
function updateEmployee(){
  inquirer.prompt([
    //Defining all the questions we need to ask the user to add a new employee
    {
      type: 'input',
      name: 'employ_id_new',
      type: 'int',
      message: 'Enter Employee ID',
    },
    {
      type: 'input',
      name: 'first_new',
      type: 'string',
      message: 'Enter Desired First name',
    },
    {
      type: 'input',
      name: 'last_new',
      type: 'string',
      message: 'Enter Desired last name',
    },
    {
      type: 'input',
      name: 'manager_new',
      type: 'int', 
      message: 'Enter Desired Manager ID',
    },
    {
      type: 'input',
      name: 'role_new',
      type: 'int', 
      message: 'Enter Desired role ID',
    }
    ]).then((answers) => {
      //I want to see if the employee exists before I try to query
      var does_exist = 'SELECT * FROM employees WHERE id = ?';
      connection.query(does_exist, [answers.employ_id_new], (err, results, fields) => {
        if(fields.length == 0){
          console.log("Employee does not exist");
          start_app();
        }
      }); 

      //Update the employee
var update_query = 'UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?';
      connection.query(update_query, [answers.first_new, answers.last_new, answers.role_new, answers.manager_new, answers.employ_id_new], (err, results,fields) => {
        if (err) throw err;
        console.log("Employee updated successfully"); 
        start_app(); 
      });
    });
}

function addDepartment()
{
  inquirer.prompt([
  {
    //your list of questions
    type: 'input',
    name: 'dep_name',
    type: 'string',
    message: 'What is the name of the new department?',
  },
  ]).then((answers) => {
  //Handeling 
  var dep_insert_query = "INSERT INTO departments (name) VALUES (?)";
  connection.query(dep_insert_query ,answers.dep_name, (err, results) => {
    if (err) throw err;
    console.log("Department added successfully");
    start_app(); 
  }); 

  });  

}

function addRole(){
  inquirer.prompt([
    {
      //your list of questions
      type: 'title',
      name: 'title',
      type: 'string',
      message: 'What is the name of the position?',
    },
    {
      //your list of questions
      type: 'title',
      name: 'salary',
      type: 'int',
      message: 'What is the salary for the position?',
    },
    {
      //your list of questions
      type: 'title',
      name: 'dep_id',
      type: 'int',
      message: 'What is the department ID?',
    },
    ]).then((answers) => {
    var query_role_insert = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
    connection.query(query_role_insert, [answers.title, answers.salary, answers.dep_id], (err, results) => {

      if (err) throw err;
      console.log("Role added successfully");
      start_app();
    });

   
    }); 

}

function deleteEmployee(){
  inquirer.prompt([
    {
      type:'input',
      name: 'employee_id',
      message: 'What is the employee ID of the person you are deleting'
    },
    {
      type:'confirm',
      name: 'confirmation',
      message: 'Are you sure you want to delete this employee?'
    }
  ]).then((answers) => {
    if(answers.confirmation){
      var delete_query = "DELETE FROM employees WHERE id = ?";
      connection.query(delete_query, [answers.employee_id], (err, results) => {
        if (err) throw err;
        console.log("Employee " + answers.employee_id + " deleted sucessfully");
      });
    }

  }); 
  start_app(); 
}