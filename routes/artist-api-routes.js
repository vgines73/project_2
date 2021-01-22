const db = require('../models');

module.exports = (app) => {
  app.get('/api/artists', (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Artist.findAll({
      include: [db.Artwork],
    }).then((dbArtist) => res.json(dbArtist));
  });

  app.get('/api/artists/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Artist.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Artwork],
    }).then((dbArtist) => res.json(dbArtist));
  });

  app.post('/api/artists', (req, res) => {
    db.Artist.create(req.body).then((dbArtist) => res.json(dbArtist));
  });

  app.delete('/api/artists/:id', (req, res) => {
    db.Artist.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbArtist) => res.json(dbArtist));
  });
};
