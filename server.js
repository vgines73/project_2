const express = require('express');

// Requiring our Routes
const htmlRouter = require('./routes/html-routes.js');
const artistRouter = require('./routes/artist-api-routes.js');
const artworkRouter = require('./routes/artwork-api-routes.js');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Invoke routes
htmlRouter(app);
artistRouter(app);
artworkRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT http://localhost:${PORT}`));
});
