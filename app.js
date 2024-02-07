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
    choices: ['View Employees', 'Add Employee', 'Update Employee', 'Delete Employee'],
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
  }
}); 

//Sql functions
function viewEmployees(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err; 
    console.table(results); 
  });
}

