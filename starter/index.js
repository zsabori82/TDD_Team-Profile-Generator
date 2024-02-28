// TODO: Import necessary modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// Import the 'render' function directly from the template file

const generateHtml = require("./src/page-template.js");


const teamMembers = [];

// Function to prompt user for Manager details
const promptManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter manager's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter manager's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter manager's email:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter manager's office number:",
      },
    ])
    .then((answers) => {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      teamMembers.push(manager);
      promptMenu();
    });
};

// Function to prompt user for Engineer details
const promptEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter engineer's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter engineer's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter engineer's email:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter engineer's GitHub username:",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      teamMembers.push(engineer);
      promptMenu();
    });
};

// Function to prompt user for Intern details
const promptIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter intern's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter intern's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter intern's email:",
      },
      {
        type: "input",
        name: "school",
        message: "Enter intern's school name:",
      },
    ])
    .then((answers) => {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      teamMembers.push(intern);
      promptMenu();
    });
};

// ...

// Function to prompt user with a menu
const promptMenu = () => {
  // Use a relative path to the CSS file
  const cssPath = path.resolve(__dirname, 'assets/style.css');

  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "Finish building the team"],
      },
    ])
    .then((answers) => {
      if (answers.choice === "Engineer") {
        promptEngineer();
      } else if (answers.choice === "Intern") {
        promptIntern();
      } else {
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        //const renderedHtml = render(teamMembers, cssContent); // Pass cssContent as an argument
        //fs.writeFileSync(outputPath, renderedHtml);
        console.log("Team HTML generated successfully!");
        // Clear the teamMembers array
        teamMembers.length = 0;
      }
    });
};

// ...



// Start by prompting the user for Manager details
promptManager();
