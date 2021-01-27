// Dependencies
const path = require('path');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

  // artist route loads artist.html
  app.get('/artist', (req, res) => res.sendFile(path.join(__dirname, '../public/artist.html')));

  // artwork route loads to artwork.html
  app.get('/artwork', (req, res) => res.sendFile(path.join(__dirname, '../public/artwork.html')));
  
  // create route loads to create.html
  app.get('/create', (req, res) => res.sendFile(path.join(__dirname, '../public/create.html')));

  // view route loads to view.html
  app.get('/view', (req, res) => res.sendFile(path.join(__dirname, '../public/view.html')));
};