const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMember = []
const idArray = []


function app(){
    function createManager(){
        console.log('Please create your team.')
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'managername',
                validate: response => {
                    if(response == "") {
                        return "please enter at least one character"
                    }
                    else {
                        return true
                    }
                }
            },
            {
                type: 'input',
                message: 'What is your office number?',
                name: 'managerofficenumber',
                validate: response => {
                    //used RegEx to specify search pattern
                    const pass = response.match(/^[1-9]\d*$/)
                    if(response) {
                        return true
                    }
                    else {
                        return "please enter a valid number"
                    }
                }
            },
            {
                type: 'input',
                message: 'What is your manager ID?',
                name: 'managerid',
            },
            {
                type: 'input',
                message: 'What is your managers email?',
                name: 'manageremail',
                validate: response => {
                    //used RegEx to specify search pattern
                    const pass = response.match(/\S+@\S+\.\S+/)
                    if(response) {
                        return true
                    }
                    else {
                        return "please enter a valid email"
                    }
                }
            }

        ]).then(responses => {
            const manager = new Manager(responses.managername, responses.manageremail, responses.managerid, responses.managerofficenumber)
            teamMember.push(manager)
            idArray.push(responses.managerid)
            createTeam()

        })

     }
    function createTeam(){
        inquirer.prompt({
            type: 'list',
            name: 'userchoice',
            message: 'What type of team member do you want to create?',
            choices: [
                'Engineer', 'Intern', 'I dont want anymore'
            ]

        })
        .then(userSelection => {
            switch(userSelection.userchoice){
                case 'Engineer':
                    addEngineer()
                    break
                case 'Intern':
                    addIntern()
                    break
                default:
                    buildTeam()


            }
        })
    }


    function addEngineer(){
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'engineername',
                validate: response => {
                    if (response == "") {
                        return "please enter at least one character"
                    }
                    else {
                        return true
                    }
                }
            },
            {
                type: 'input',
                message: 'What is your GitHub?',
                name: 'engineergithub',
                validate: response => {
                    if (response == "") {
                        return "please enter at least one character"
                    }
                    else {
                        return true
                    }
                }
            },
            {
                type: 'input',
                message: 'What is your ID?',
                name: 'engineerid',
            },
            {
                type: 'input',
                message: 'What is your email?',
                name: 'engineeremail',
                validate: response => {
                    const pass = response.match(/\S+@\S+\.\S+/)
                    if (response) {
                        return true
                    }
                    else {
                        return "please enter a valid email"
                    }
                }
            }

        ]).then(responses => {
            const engineer = new Engineer(responses.engineername, responses.engineeremail, responses.engineerrid, responses.engineergithub)
            teamMember.push(engineer)
            idArray.push(responses.engineerid)
            createTeam()

        })
    }
    function addIntern(){
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'internname',
                validate: response => {
                    if (response == "") {
                        return "please enter at least one character"
                    }
                    else {
                        return true
                    }
                }
            },
            {
                type: 'input',
                message: 'What is your school name?',
                name: 'internschool',
                validate: response => {
                    if (response == "") {
                        return "please enter at least one character"
                    }
                    else {
                        return true
                    }
                }
            },
            {
                type: 'input',
                message: 'What is your ID?',
                name: 'internid',
            },
            {
                type: 'input',
                message: 'What is your email?',
                name: 'internemail',
                validate: response => {
                    const pass = response.match(/\S+@\S+\.\S+/)
                    if (response) {
                        return true
                    }
                    else {
                        return "please enter a valid email"
                    }
                }
            }

        ]).then(responses => {
            const intern = new Intern(responses.internname, responses.internemail, responses.internid, responses.internschool)
            teamMember.push(intern)
            idArray.push(responses.internid)
            createTeam()

        })
    }


    function buildTeam(){
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMember), 'UTF-8')
    }
    createManager()

}
app()