var express = require('express');
var router = express.Router();

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');

const { CheckIfDBHasData } = require('./authMiddlewares');

var RoleService = require("../services/RoleService");
var SizeService = require("../services/SizeService");
var SpeciesService = require("../services/SpeciesService");
var TemperamentService = require("../services/TemperamentService");
var UserService = require("../services/UserService");
var AnimalService = require("../services/AnimalService");
var AnimalTemperamentService = require("../services/AnimalTemperamentService");

const db = require('../models');

var roleService = new RoleService(db);
var sizeService = new SizeService(db);
var speciesService = new SpeciesService(db);
var temperamentService = new TemperamentService(db);
var userService = new UserService(db);
var animalService = new AnimalService(db);
var animaltemperamentService = new AnimalTemperamentService(db);

/* GET home page. */
router.get('/', function (req, res, next) {
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  res.render('index', { title: 'Express', username, roleid });
});

passport.use(new LocalStrategy(function verify(username, password, cb) {
  userService.getOneByName(username).then((data) => {
    if(data === null) {
      return cb(null, false, { message: "Incorrect username." });
    }
    if(data.Password !== password) {
        return cb(null, false, { message: "Incorrect password." });
    }
    return cb(null, data);
  }).catch(err => cb(err));
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { userid: user.UserId, username: user.Username, roleid: user.RoleId });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.get('/login', function(req, res, next) {
  const username = req.user?.username;
  const roleid = req.user?.roleid;
  res.render('login', { username, roleid });
});

router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/signup',
  failureMessage: true
}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
    userService.create(req.body.firstname, req.body.lastname, req.body.username, req.body.password);
    res.redirect('/login');
});

router.post('/', async function(req, res, next) {
  if (await CheckIfDBHasData()) {
    console.log('No records found, populating the database');
    await roleService.InsertData('roles.json');
    await sizeService.InsertData('sizes.json');
    await speciesService.InsertData('species.json');
    await temperamentService.InsertData('temperaments.json');
    await userService.InsertData('users.json');
    await animalService.InsertData('animals.json');
    await animaltemperamentService.InsertData('animalstemperaments.json');
  } else {
    console.log('No records added, the database is already populated');
  };
  res.end();
});

module.exports = router;

