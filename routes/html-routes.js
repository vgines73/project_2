// Dependencies
const path = require('path');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
  );

  // cms route loads cms.html
  app.get('/artist', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/artist.html'))
  );

  app.get('/artwork', (req, res) => 
      res.sendFile(path.join(__dirname, '../public/artwork.html'))
  );
};