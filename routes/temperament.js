var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var TemperamentService = require("../services/TemperamentService");
var AnimalTemperamentService = require("../services/AnimalTemperamentService");
const db = require('../models');
var temperamentService = new TemperamentService(db);
var animaltemperamentService = new AnimalTemperamentService(db);

const { isAdmin } = require('./authMiddlewares');

router.get('/', isAdmin, async function (req, res, next) {
    const temperament = await temperamentService.getAll();
    const username = req.user?.username;
    const roleid = req.user?.roleid;
    res.render("temperament", { username, roleid, temperament })
});

router.post('/update', isAdmin, jsonParser, async function (req, res, next) {
    const temperamentid = req.body.id;
    const temperament = req.body.name;
    if ((temperament !== "") && (temperament !== null)) {
        await temperamentService.updateOne(temperamentid, temperament);
    };
    res.end();
});

router.post('/delete', isAdmin, jsonParser, async function (req, res, next) {
    const temperamentid = req.body.id;
    if (Object.keys(await animaltemperamentService.getOne(temperamentid)).length !== 0) {
        console.log("Cannot delete temperament!");
    } else {
        await temperamentService.deleteOne(temperamentid);
    };
    res.end();
});

router.post('/add', isAdmin, jsonParser, async function (req, res, next) {
    const temperamentname = req.body.name;
    if ((temperamentname !== "") && (temperamentname !== null)) {
        await temperamentService.addOne(temperamentname);
    };
    res.end();
});

module.exports = router;