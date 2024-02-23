const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

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
  // Similar to promptManager, collect engineer details and create an Engineer instance
};

// Function to prompt user for Intern details
const promptIntern = () => {
  // Similar to promptManager, collect intern details and create an Intern instance
};

// Function to prompt user with a menu
const promptMenu = () => {
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
        // User selected to finish building the team, call render function
        const renderedHtml = render(teamMembers);
        // Write the HTML to the output file
        fs.writeFileSync(outputPath, renderedHtml);
        console.log("Team HTML generated successfully!");
      }
    });
};

// Start by prompting the user for Manager details
promptManager();
