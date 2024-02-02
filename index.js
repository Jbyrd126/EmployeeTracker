// inquirer
const inquirer = require("inquirer");
require("dotenv").config();
const db = require("./db/connection");

const prompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          {name: "view all departments",
          value: "VIEW_DEPARTMENTS"},
          {name: "view all employees",
          value: "VIEW_EMPLOYEES"},
          {name: "view all roles",
          value: "VIEW_ROLES"},
          {name: "add a department",
          value: "ADD_DEPARTMENT"},
          {name: "add a role",
          value: "ADD_ROLE"},
          {name: "add an emplyee",
          value: "ADD_EMPLOYEE"},
          {name: "update an employee's role",
          value: "UPDATE_EMPLOYEE_ROLE"},
        ],
      },
    ])
    .then((res) => {
      let choice = res.choices;
      switch (choice) {
        case `VIEW_EMPLOYEES`:
          getAllEmployees();
          break;

        case `VIEW_ROLES`:
          getAllRoles();
          break;

        case `VIEW_DEPARTMENTS`:
          getAllDepartments();
          break;

        case `ADD_DEPARTMENT`:
          addDepartment();
          break;

        case `ADD_ROLE`:
          addRole();
          break;

        case `ADD_EMPLOYEE`:
          addDepartment();
          break;

        case `UPDATE_EMPLOYEE_ROLE`:
          updateEMployeeRole();
          break;
      }
    });
};

// This will have the initial prompt for "What do you want to do?"
prompt();


function getAllEmployees(params) {
  db.query(`select * from employees`, (err, results) => {
    console.table(results);
    prompt();
  });
}

function getAllRoles(params) {
    db.query(`select * from roles`,(err,results)=>{
        console.table(results);
        start();
    })
}

/** ToDo --eventually I have a Join that shows the department name */
function viewDepartments() {

    dbquery('select * from department', (err,results)=> {
        console.table(results);
        console.log("Viewing All Departments");
        prompt();
    });
}