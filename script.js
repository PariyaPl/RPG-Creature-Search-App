const inputNameOrId = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click", outputInfo);
inputNameOrId.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        outputInfo();
        inputNameOrId.value = "";
    }
  });

let creaturs = [];
fetch('https://rpg-creature-api.freecodecamp.rocks/api/creatures')
  .then(response => response.json())
  .then(data => {
    creaturs = data;
  })
  .catch(error => console.error('Error fetching JSON:', error));

function outputInfo() {
    let theCreatur = {};
    const nameOrId = inputNameOrId.value;
    const found = creaturs.some(creatur => 
        creatur.id == nameOrId || creatur.name.toLowerCase().includes(nameOrId.toString().toLowerCase()));
    if(found) {
        fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`)
            .then(response => response.json())
            .then(data => {
                theCreatur = data;
                document.getElementById("creature-name").textContent = theCreatur.name;
                document.getElementById("creature-id").textContent = `#${theCreatur.id}`;
                document.getElementById("weight").textContent = `Weight: ${theCreatur.weight}`;
                document.getElementById("height").textContent = `Height: ${theCreatur.height}`;
                document.getElementById("types").innerHTML = "";
                for(let i = 0; i < theCreatur.types.length; i++) {
                    document.getElementById("types").innerHTML 
                    += ` <span>${(theCreatur.types[i].name).toUpperCase()}</span>`;
                }
                for(let i = 0; i < theCreatur.stats.length; i++) {
                    document.getElementById(`${theCreatur.stats[i].name}`).textContent 
                    = theCreatur.stats[i].base_stat;
                }
            })
            .catch(error => console.error('Error fetching JSON:', error));
    } 
    else {
        alert("Creature not found");
    }
};
