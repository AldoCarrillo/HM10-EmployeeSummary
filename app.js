//Classes paths
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");
const { log } = require("console");
//const { async } = require("rxjs");



//function to input Manager
async function EnterManager(){
  
  console.log("---------MANAGER----------");

  var inquirer =  require("inquirer");
   await inquirer 
    .prompt([
      {
          name: "name",
          message: "Manager's Name:"
      },
      {
          name: "email",
          message: "Manager's Email:"
      },
      {
          name: "office",
          message: "Manager's Office Number:"
      },
    ])
    .then(async function(response) {

      const newManager =  new Manager(response.name, 1, response.email, response.office);
      return newManager;
    });
 


  
}

//function to input Engineers
async function EnterEngineer(){
  var inquirer =  require("inquirer");
  const arrayEngineers =[];
  await inquirer
    .prompt([
      {
        name: "numberEngineers",
        message: "How Many Engineers?:"
      }

    ])
    .then(async function(response){

      for(let i=1; i<= response.numberEngineers; i++){
        
        console.log("***Engineer #" +i+" ***");
       await  inquirer
          .prompt([
            {
                name: "name",
                message: "Engineer "+i+" Name:"
            },
            {
              name: "email",
              message: "Engineer "+i+" Email:"
            },
            {
              name: "github",
              message: "Engineer "+i+" GitHub:"
            },

          ])
          .then(async function(response) {

            const newEngineer =  new Engineer(response.name, 1, response.email, response.github);
            arrayEngineers.push(newEngineer);


          });

      }
        return arrayEngineers;

    });
  
}

//function to input  Interns

 function EnterInterns(){
  var inquirer =  require("inquirer");
  const arrayInterns =[];
  inquirer
    .prompt([
      {
        name: "numberInterns",
        message: "How Many Interns?:"
      }

    ])
    .then(function(response){

      for(let i=1; i<= response.numberInterns; i++){
        
        console.log("***Intern #" +i+" ***");
        inquirer
          .prompt([
            {
                name: "name",
                message: "Intern "+i+" Name:"
            },
            {
              name: "email",
              message: "Intern "+i+" Email:"
            },
            {
              name: "school",
              message: "Intern "+i+" School:"
            },

          ])
          .then(function(response) {

            const newIntern = new Intern(response.name, 1, response.email, response.school);
            arrayInterns.push(newIntern);

          });

      }
        return arrayInterns;

    });

}


// get the html file replace the variables form each object
function replacePlaceholders  (template, placeholder, value)  {
  
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);

};


//create team array with all html files manager engineers and interns
function createTeam(managers,engineers,interns){
  var team = [];
  managers.forEach(element => {
    team.push(element);
  });

  engineers.forEach(element => {
    team.push(element);
  });

  interns.forEach(element => {
    team.push(element);
  });

  return team.join("");
}

//create the html file with all members of the team
function writeHTMLFile(arrayManagersFiles,arrayEngineersFiles,arrayInternsFiles ){

  var teamFile  = fs.readFileSync("./templates/main.html","utf8");
  var team = createTeam(arrayManagersFiles,arrayEngineersFiles,arrayInternsFiles);
  teamFile = replacePlaceholders(teamFile,"team",team);
  writeFileAsync('./output/team.html', teamFile);
  console.log(' \n ****TEAM CREATED!****');

}


console.log("***** Enter your Engineering TEAM *****")
//array with manager engineer and intern objects
const arrayManagers =[];
const arrayEngineers = [];
const arrayInterns = [];

//html file with all manager engineers and interns
const arrayManagersFiles =[];
const arrayEngineersFiles = [];
const arrayInternsFiles = [];

//ask the user for each member of the team
arrayManagers.push(EnterManager());
arrayEngineers  =   EnterEngineer();
arrayInterns    =   EnterInterns();



//create a html file for each object 
arrayManagers.forEach(element => {
  var managerFile = fs.readFileSync("./templates/manager.html","utf8");
  managerFile = replacePlaceholders(managerFile, "name", element.getName());
  managerFile = replacePlaceholders(managerFile, "role", element.getRole());
  managerFile = replacePlaceholders(managerFile, "email", element.getEmail());
  managerFile = replacePlaceholders(managerFile, "id", element.getId());
  managerFile = replacePlaceholders(managerFile, "officeNumber", element.getOfficeNumber());

  arrayManagersFiles.push(managerFile);
  
});

arrayEngineers.forEach(element => {
  var engineerFile = fs.readFileSync("./templates/engineer.html","utf8");
  engineerFile = replacePlaceholders(engineerFile, "name", element.getName());
  engineerFile = replacePlaceholders(engineerFile, "role", element.getRole());
  engineerFile = replacePlaceholders(engineerFile, "email", element.getEmail());
  engineerFile = replacePlaceholders(engineerFile, "id", element.getId());
  engineerFile = replacePlaceholders(engineerFile, "github", element.getGitHub());

  arrayEngineersFiles.push(engineerFile);
  
});

arrayInterns.forEach(element => {
  var internFile = fs.readFileSync("./templates/intern.html","utf8");
  internFile = replacePlaceholders(internFile, "name", element.getName());
  internFile = replacePlaceholders(internFile, "role", element.getRole());
  internFile = replacePlaceholders(internFile, "email", element.getEmail());
  internFile = replacePlaceholders(internFile, "id", element.getId());
  internFile = replacePlaceholders(internFile, "school", element.getSchool());

  arrayInternsFiles.push(internFile);
  
});


//create final html file
writeHTMLFile(arrayManagersFiles,arrayEngineersFiles,arrayInternsFiles);



  

  
  
