const express = require('express');
const artist = require('../models/artist');

const router = express.Router();

// Import model (index.js) to use database funcitons
artwork = require('../models/index')
artist = require('../models/artist')

// Create all the routes artists CRUD

router.get('/', (req, res) => {
    artist.selectAll((data) => {
        const artistObject = {
            artists:data,
        };
        console.log(artistObject);
        res.render('index', artistObject)
    });
});

router.post('/api/artists', (req, res) => {
    console.log('hello');
    s
})