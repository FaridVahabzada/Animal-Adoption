var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var AnimalService = require("../services/AnimalService");
const db = require('../models');
var animalService = new AnimalService(db);

const { isAdmin } = require('./authMiddlewares');

router.get('/', async function (req, res, next) {
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  const animals = await animalService.getAll();
  res.render('animals', { username, roleid, animals: animals, sizes:null });

});

router.get('/byAge', async function (req, res, next) {
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  const animals = await animalService.byAge();
  res.render('animals', { username, roleid, animals: animals, sizes:null });
});

router.get('/byAdoption', async function (req, res, next) {
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  const animals = await animalService.byAdoption();
  res.render('animals', { username, roleid, animals: animals, sizes:null });
});

router.get('/byPopularity', async function (req, res, next) {
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  const animals = await animalService.byPopularity();
  res.render('animals', { username, roleid, animals: animals, sizes:null });
});

router.get('/byDateRange/:startDate/:endDate', async function (req, res, next) {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  const animals = await animalService.byDateRange(startDate, endDate);
  res.render('animals', { username, roleid, animals: animals, sizes:null });
});

router.get('/bySize', isAdmin, async function (req, res, next) {
  const sizes = await animalService.bySize();
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  const animals = await animalService.getAll();
  res.render('animals', { username, roleid, animals: animals, sizes });
});

router.post('/', jsonParser, async function (req, res, next) {
  const userid = req.user?.userid;
  const animalid = req.body.id;
  const roleid = req.user?.roleid;
  if (roleid == 2) {
    await animalService.adoptOne(userid, animalid);
  } else if (roleid == 1){
    await animalService.cancelOne(animalid);
  };
  res.end();
});

module.exports = router;

