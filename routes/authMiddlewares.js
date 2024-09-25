const db = require('../models');
const { QueryTypes } = require('sequelize');

module.exports = {
    isAdmin: function(req, res, next) {
      if(req.user == null) {
        res.status(401).send("Access Denied");
        return;
      } else if(req.user.roleid === 1) {
        next();
        return;
      }
      else {
        res.status(401).send("Access Denied");
      }
    },
    CheckIfDBHasData: async function() {
        let animals = await db.sequelize.query('SELECT COUNT(*) AS Total FROM Animals', {
          raw: true,
          type: QueryTypes.SELECT
        });
        let users = await db.sequelize.query('SELECT COUNT(*) AS Total FROM Users', {
          raw: true,
          type: QueryTypes.SELECT
        });
      
        let species = await db.sequelize.query('SELECT COUNT(*) AS Total FROM Species', {
          raw: true,
          type: QueryTypes.SELECT
        });
        let sizes = await db.sequelize.query('SELECT COUNT(*) AS Total FROM Sizes', {
          raw: true,
          type: QueryTypes.SELECT
        });
        let temperaments = await db.sequelize.query('SELECT COUNT(*) AS Total FROM Temperaments', {
          raw: true,
          type: QueryTypes.SELECT
        });
        let roles = await db.sequelize.query('SELECT COUNT(*) AS Total FROM Roles', {
          raw: true,
          type: QueryTypes.SELECT
        });
      
        if ((animals[0].Total == 0) && (users[0].Total == 0)) {
          return true;
        };
        if ((species[0].Total != 0) || (sizes[0].Total != 0) || (temperaments[0].Total != 0) || (roles[0].Total != 0)) {
          return false;
        };
      
        return false;
    }
}