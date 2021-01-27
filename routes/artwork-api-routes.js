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

    // route to create and post artwork
    app.post('/api/artworks', (req, res) => {
        console.log(req.body)
        db.Artwork.create(req.body).then((dbArtwork) => res.json(dbArtwork));
    });

    // route to delete artwork
    app.delete('/api/artworks/:id', (req, res) => {
        db.Artwork.destroy(
            {
                where: {
                    id: req.params.id,
                },
            }
        ).then((dbArtwork) => res.json(dbArtwork));
    });

    // route to update artwork
    app.put('/api/artworks/:id', (req, res) => {
        console.log(req.body)
        db.Artwork.update(
            {
                title: req.body.title,
                postedBy: req.body.postedBy,
                year: req.body.year,
                body: req.body.body,
                category: req.body.category,
                condition: req.body.condition,
                image: req.body.image,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
    .then((dbArtwork) => {
        console.log(dbArtwork);
        res.json(dbArtwork)
    });
  });
};
