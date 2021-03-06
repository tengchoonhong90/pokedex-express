const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const file = "pokedex.json";

app.get('/', (request, response) => {
  // send response with some data (a string)
  response.send("Welcome to the online Pokedex!");
});

app.get("/:pokemon", (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    for (let i = 0; i < obj.pokemon.length; ++i) {
      if (obj.pokemon[i].name.toLowerCase() == request.params.pokemon.toLowerCase()) {
        response.send(`<img src="${obj.pokemon[i].img}"><br>
        Name: ${obj.pokemon[i].name}<br>
        No: ${obj.pokemon[i].num}<br>
        Type: ${obj.pokemon[i].type}<br>
        Height: ${obj.pokemon[i].height}<br>
        Weight: ${obj.pokemon[i].weight}<br>
        Weakness: ${obj.pokemon[i].weaknesses}<br>`);
      };
    };
    for (let i = 0; i < obj.pokemon.length; ++i) {
      if (obj.pokemon[i].name.toLowerCase() != request.params.pokemon.toLowerCase()) {
        response.status(404);
        response.send(`Could not find information about ${request.params.pokemon} - Is that a new pokemon? Gotta catch em' all!`);
      };
    };
  });
});

app.get('/type/:type', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let placeholder = [];
    for (let i = 0; i < obj.pokemon.length; i++) {
      for (let j = 0; j < obj.pokemon[i].type.length; ++j) {
        if (obj.pokemon[i].type[j].toLowerCase() == request.params.type.toLowerCase()) {
          placeholder.push(`${obj.pokemon[i].name}`);
        }
      }
    }
    let nameholder = request.params.type.charAt(0).toUpperCase() + request.params.type.slice(1);
    response.send(`Pokemon that is ${nameholder}-type:<br>${placeholder.join("<br>")}`);
  })
})

app.get('/weaknesses/:weakness', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let placeholder = [];
    for (let i = 0; i < obj.pokemon.length; ++i) {
      for (let j = 0; j < obj.pokemon[i].weaknesses.length; ++j) {
        if (obj.pokemon[i].weaknesses[j].toLowerCase() == request.params.weakness.toLowerCase()) {
          placeholder.push(`${obj.pokemon[i].name}`);
        }
      }
    }
    let nameholder = request.params.weakness.charAt(0).toUpperCase() + request.params.weakness.slice(1);
    response.send(`Pokemon weak to ${nameholder}-type:<br>${placeholder.join("<br>")}`);
  })
})

app.get("/nextevolution/:evolve", (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let placeholder = [];
    for (let i = 0; i < obj.pokemon.length; ++i) {
      if (obj.pokemon[i].name.toLowerCase() == request.params.evolve.toLowerCase()) {
        for (let j = 0; j< obj.pokemon[i].prev_evolution.length; ++j) {
          placeholder.push(`${obj.pokemon[i].prev_evolution[j].name}`);
        }
      };
    };
    let nameholder = request.params.evolve.charAt(0).toUpperCase() + request.params.evolve.slice(1);
    response.send(`${nameholder} evolves from ${placeholder.join(" and ")}`);
  });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


