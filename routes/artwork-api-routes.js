const db = require('../models');

module.exports = (app) => {
  app.get('/api/artworks', (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Artwork.findAll({
      include: [db.Artist],
    }).then((dbArtwork) => res.json(dbArtwork));
  });

  app.get('/api/artworks/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Artwork.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Artist],
    }).then((dbArtwork) => res.json(dbArtwork));
  });

  app.post('/api/artwork', (req, res) => {
    db.Artwork.create(req.body).then((dbArtwork) => res.json(dbArtwork));
  });

  app.delete('/api/artwork/:id', (req, res) => {
    db.Artwork.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbArtwork) => res.json(dbArtwork));
  });
};
