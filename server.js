// inquirer -- you know this guy, hes a heavy lifter -- the boy gets it in
const inquirer = require("inquirer");
// im a colorin mys stuffs

const chalk = require('chalk');

const log = console.log;

// Universal Variables -- I'ma hidin my stuffs
require("dotenv").config();
// mySQL connection --- tubes man, tubes
const db = require("./db/connection");

console.log( chalk.blue(`
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
                                                                                                                                                          
                                                                            
`));
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
          { name: "View all positions", value: "VIEW_POSITIONS" },
          { name: "Add a department", value: "ADD_DEPARTMENT" },
          { name: "Add a position", value: "ADD_POSITION" },
          { name: "Add an employee", value: "ADD_EMPLOYEE" },
          { name: "Update an employee's position", value: "UPDATE_EMPLOYEE_POSITION" },
        ],
      },
    ])
    .then((res) => {
      let choice = res.choices;
      switch (choice) {
        case `VIEW_EMPLOYEES`:
          log(chalk.yellow("Who you lookin for mane?"));
          getAllEmployees();
          break;
        case `VIEW_POSITIONS`:
          log(chalk.yellow("Sheesus, Why is legal makin so much?"));
          getAllRoles();
          break;
        case `VIEW_DEPARTMENTS`:
          log(chalk.yellow("Do we really need this many people to do this?"));
          getAllDepartments();
          break;
        case `ADD_DEPARTMENT`:
          log(chalk.yellow("We're never gunna get our bonus if we keep adding departments!"));
          addDepartment();
          break;
        case `ADD_POSITION`:
          log(chalk.yellow("What do we need now?"));
          addRole();
          break;
        case `ADD_EMPLOYEE`:
          log(chalk.yellow("We have so many people right now, this is ridiculous!"));
          addEmployee();
          break;
        case `UPDATE_EMPLOYEE_POSITION`:
          log(chalk.yellow("Do they really deserve this?"))
          updateEmployeeRole();
          break;
        default:
      }
    });
};

// query the server bring back everything in the "employee" table
function getAllEmployees() {
  db.query(`SELECT * from employee`, (err, results) => {
    if (err) throw err;
    console.table(results);
    prompt();
  });
}
// query the server bring back everything in the "position" table
function getAllRoles() {
  db.query(`SELECT * from position`, (err, results) => {
    if (err) throw err;
    console.table(results);
    prompt();
  });
}

// query the server bring back everything in the "department" table
function getAllDepartments() {
  db.query(`SELECT * from department`, (err, results) => {
    if (err) throw err;
    console.table(results);
    console.log("Viewing All Departments");
    prompt();
  });
}
// insert and set a new darptment to the "department" table
function addDepartment() {
  inquirer
    //ask user what the new department will be called - build object
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What do you want to call this department?",
      },
    ])
    // grab response from user
    .then((userResponse) => {
      db.query(
        // user response is set into the database table of department as a "newDepartment"
        `INSERT into department SET ?`,
        {
          name: userResponse.newDepartment,
        },
        (err) => {
          if (err) throw err;
          // let em know
          console.log(
            `\n ${userResponse.newDepartment} is in there my guy! You done did it!  \n`
          );
          // do it, do it, do it
          prompt();
        }
      );
    });
}

addRole = () => {
  db.query(`SELECT * FROM department;`, (err, res) => {
    if (err) throw err;
    // map departments table to bring back an array of existing departments for the user to insert new
    let departments = res.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    inquirer
      // questions for users to build new position
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the position you want to add?",
        },
        {
          name: "salary",
          type: "input",
          message:
            "What is the desired salary of the position you want to add? (but remember we gon low ball em anyway)",
        },
        {
          name: "departmentName",
          type: "rawlist",
          message: "Which department do you want to add the new position to?",
          choices: departments,
        },
      ])
      // take user answers - make an object out of them - insert it into the chosen department
      .then((response) => {
        db.query(
          `INSERT INTO position SET ?`,
          {
            title: response.title,
            salary: response.salary,
            department_id: response.departmentName,
          },
          (err, res) => {
            if (err) throw err;
            console.log(
              `\n ${response.title} is in there my guy! You done did it! \n`
            );
            prompt();
          }
        );
      });
  });
};

addEmployee = () => {
  db.query(`SELECT * FROM position;`, (err, res) => {
    if (err) throw err;
    // oh man here we go again -- i guess we'll make em into objects in an array -- you know the bits and bytes from the position table
    let positions = res.map((position) => ({ name: position.title, value: position.id }));
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      //seriously we've seen this guy before -- its gunna do the thang we it gets the data, puts its good eye on it, turns that data into objects and stuffs em in array so we can manipulate em *awkward laugh* manipulate
      let employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
      // ok heres this guy again -- he's straight puttin in work
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What's the employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What's the employee's last name?",
          },
          {
            name: "position",
            type: "rawlist",
            message: "What's the employee's position?",
            choices:positions,
          },
          {
            // oh but look theres something new! i spot a wild confirm choice!
            name: "boss",
            type: "confirm",
            message:
              "Is the employee made to be governed by a corporate shill in a very malfitting suit?",
            default: true,
          },
          {
            name: "selectedBoss",
            type: "rawlist",
            message: "Who is the employee's Overlord?",
            choices: employees,
            when: (answers) => answers.boss,
          },
        ])
        // bring it on back ..... as an object
        .then((response) => {
          const newGuy = {
            // what we got in here? are these new keys and values being made. hoooo hooooo I'd buy that for a dollar
            first_name: response.firstName,
            last_name: response.lastName,
            position_id: response.position,
            manager_id: response.boss ? response.selectedBoss : null,
          };
          // Ron Popeil this right here -- insert newGuy into employee table .then SET IT AND FORGET IT
          db.query(`INSERT INTO employee SET ?`, newGuy, (err, res) => {
            if (err) throw err;
            // let em know
            console.log(
              `\n Hey  ${response.firstName} ${response.lastName} !   Welcome my son ... Welcome toooo the machine!! \n`
            );
            prompt();
          });
        });
    });
  });
};

// keep it movin pal
prompt();
