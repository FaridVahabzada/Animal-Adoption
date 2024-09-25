var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var AnimalService = require("../services/AnimalService");
var SpeciesService = require("../services/SpeciesService");
const db = require('../models');
var speciesService = new SpeciesService(db);
var animalService = new AnimalService(db);

const { isAdmin } = require('./authMiddlewares');

router.get('/', isAdmin, async function (req, res, next) {
    const species = await speciesService.getAll();
    const username = req.user?.username;
    const roleid = req.user?.roleid;
    res.render("species", { username, roleid, species })
})

router.post('/update', isAdmin, jsonParser, async function (req, res, next) {
    const speciesid = req.body.id;
    const species = req.body.name;
    if ((species !== "") && (species !== null)) {
        await speciesService.updateOne(speciesid, species);
    };
    res.end();
  });

router.post('/delete', isAdmin, jsonParser, async function (req, res, next) {
    const speciesid = req.body.id;
    if (Object.keys(await animalService.getOne(speciesid)).length !== 0) {
        console.log("Cannot delete species!");
    } else {
        await speciesService.deleteOne(speciesid);
    };
    res.end();
});

router.post('/add', isAdmin, jsonParser, async function (req, res, next) {
    const speciesname = req.body.name;
    if ((speciesname !== "") && (speciesname !== null)) {
        await speciesService.addOne(speciesname);
    };
    res.end();
});
  
module.exports = router;