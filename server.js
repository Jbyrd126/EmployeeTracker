// inquirer
const inquirer = require("inquirer");
// Universal Variables
require("dotenv").config();
// mySQL connection
const db = require("./db/connection");
// call to the functions in the index.js to use with inquirer
const { getAllEmployees, getAllRoles, getAllDepartments, addDepartment, addRole } = require('./db/index.js');

console.log(`
@@@@@@@@  @@@@@@@@@@   @@@@@@@   @@@        @@@@@@   @@@ @@@  @@@@@@@@  @@@@@@@@     @@@@@@@  @@@@@@@    @@@@@@    @@@@@@@  @@@  @@@  @@@@@@@@  @@@@@@@   
@@@@@@@@  @@@@@@@@@@@  @@@@@@@@  @@@       @@@@@@@@  @@@ @@@  @@@@@@@@  @@@@@@@@     @@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@@  @@@  @@@  @@@@@@@@  @@@@@@@@  
@@!       @@! @@! @@!  @@!  @@@  @@!       @@!  @@@  @@! !@@  @@!       @@!            @@!    @@!  @@@  @@!  @@@  !@@       @@!  !@@  @@!       @@!  @@@  
!@!       !@! !@! !@!  !@!  @!@  !@!       !@!  @!@  !@! @!!  !@!       !@!            !@!    !@!  @!@  !@!  @!@  !@!       !@!  @!!  !@!       !@!  @!@  
@!!!:!    @!! !!@ @!@  @!@@!@!   @!!       @!@  !@!   !@!@!   @!!!:!    @!!!:!         @!!    @!@!!@!   @!@!@!@!  !@!       @!@@!@!   @!!!:!    @!@!!@!   
!!!!!:    !@!   ! !@!  !!@!!!    !!!       !@!  !!!    @!!!   !!!!!:    !!!!!:         !!!    !!@!@!    !!!@!!!!  !!!       !!@!!!    !!!!!:    !!@!@!    
!!:       !!:     !!:  !!:       !!:       !!:  !!!    !!:    !!:       !!:            !!:    !!: :!!   !!:  !!!  :!!       !!: :!!   !!:       !!: :!!   
:!:       :!:     :!:  :!:        :!:      :!:  !:!    :!:    :!:       :!:            :!:    :!:  !:!  :!:  !:!  :!:       :!:  !:!  :!:       :!:  !:!  
 :: ::::  :::     ::    ::        :: ::::  ::::: ::     ::     :: ::::   :: ::::        ::    ::   :::  ::   :::   ::: :::   ::  :::   :: ::::  ::   :::  
: :: ::    :      :     :        : :: : :   : :  :      :     : :: ::   : :: ::         :      :   : :   :   : :   :: :: :   :   :::  : :: ::    :   : :  
                                                                                                                                                          
                                                                            
`);
// inquirer prompt
const prompt = () => {
  inquirer
// initial questions 
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
          addEmployee();
          break;
        case `UPDATE_EMPLOYEE_ROLE`:
          updateEmployeeRole();
          break;
        default:
      }
    });
};

// start app
prompt();
