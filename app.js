const express = require('express');
const app = express();
const pokeBank = require('./pokeBank');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  const pokemonList = pokeBank.list();
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Pokedex</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <h1>List of Pokémon</h1>
        <ul>
  `;
  pokemonList.forEach(pokemon => {
    html += `<li><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></li>`;
  });
  html += `
        </ul>
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/pokemon/:id', (req, res) => {
  const pokemon = pokeBank.find(req.params.id);
  if (!pokemon) {
    res.status(404).send('Pokémon not found');
  } else {
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${pokemon.name} Details</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <h1>${pokemon.name} Details</h1>
          <p>Type: ${pokemon.type}</p>
          <p>Trainer: ${pokemon.trainer}</p>
          <p>Date: ${pokemon.date}</p>
        </body>
      </html>
    `;
    res.send(html);
  }
});
app.get("/pokemon/:id", (req, res, next) => {
  const id = req.params.id;
  const post = pokeeBank.find(id);
  if (!pokemon.id) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404);
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Pokedex</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Pokedex</header>
      <div class="not-found">
        <p>Pika pika... Page Not Found</p>
        <img src="/pikachu-404.gif" />
      </div>
    </body>
    </html>`;
    res.send(html);
  } else {
    // ... Otherwise, send the regular post detail HTML
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
