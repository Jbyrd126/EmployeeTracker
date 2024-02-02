// inquirer
const inquirer = require("inquirer");
// Universal Variable
require("dotenv").config();
const db = require("./db/connection");

const prompt = () => {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          { name: "View all departments", value: "VIEW_DEPARTMENTS" },
          { name: "View all employees", value: "VIEW_EMPLOYEES" },
          { name: "View all roles", value: "VIEW_ROLES" },
          { name: "Add a department", value: "ADD_DEPARTMENT" },
          { name: "Add a role", value: "ADD_ROLE" },
          { name: "Add an employee", value: "ADD_EMPLOYEE" },
          { name: "Update an employee's role", value: "UPDATE_EMPLOYEE_ROLE" },
        ],
      },
    ])
    .then((res) => {
      let choice = res.choices;
      switch (choice) {
        case `VIEW_EMPLOYEES`:
          console.log("Who you lookin for mane?");
          getAllEmployees();
          break;

        case `VIEW_ROLES`:
          console.log("Sheesus, Why is legal makin so much?");
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
        default:
      }
    });
};

function getAllEmployees() {
  db.query(`SELECT * from employee`, (err, results) => {
    if (err) throw err;
    console.table(results);
    prompt();
  });
}

function getAllRoles() {
  db.query(`SELECT * from role`, (err, results) => {
    if (err) throw err;
    console.table(results);
    prompt();
  });
}

/** ToDo --eventually I have a Join that shows the department name */
function getAllDepartments() {
  db.query(`SELECT * from department`, (err, results) => {
    if (err) throw err;
    console.table(results);
    console.log("Viewing All Departments");
    prompt();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What do you want to call this department?",
      },
    ])
    .then((userResponse) => {
      db.query(
        `INSERT into department SET ?`,
        {
          name: userResponse.newDepartment,
        },
        (err,) => {
          if (err) throw err;
          console.log(`\n ${userResponse.newDepartment} successfully added to database! \n`);

          prompt();
        }
      );
    });
}

// This will have the initial prompt for "What do you want to do?"
prompt();
