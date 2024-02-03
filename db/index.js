// query functions
// query the server bring back everything in the "employee" table
function getAllEmployees() {
  db.query(`SELECT * from employee`, (err, results) => {
    if (err) throw err;
    console.table(results);
    prompt();
  });
}
// query the server bring back everything in the "role" table
function getAllRoles() {
  db.query(`SELECT * from role`, (err, results) => {
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
          // restart app
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
      // questions for users to build new role
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the role you want to add?",
        },
        {
          name: "salary",
          type: "input",
          message:
            "What is the desired salary of the role you want to add? (but remember we gon low ball em anyway)",
        },
        {
          name: "departmentName",
          type: "rawlist",
          message: "Which department do you want to add the new role to?",
          choices: departments,
        },
      ])
      // take user answers - make an object out of them - insert it into the chosen department
      .then((response) => {
        db.query(
          `INSERT INTO role SET ?`,
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

module.exports = {
  getAllEmployees,
  getAllRoles,
  getAllDepartments,
  addDepartment,
  addRole,
};
