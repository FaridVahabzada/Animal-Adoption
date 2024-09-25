const fs = require('fs');
const { QueryTypes } = require('sequelize');
const db = require('../models');
class AnimalTemperamentService {
    constructor(db) {
        this.client = db.sequelize;
        this.AnimalsTemperament = db.AnimalsTemperament;
    }
    async InsertData(filename) {
        const { records } = await JSON.parse(fs.readFileSync('./public/json/' + filename));
      
        records.forEach( async (record) => {
          let result = await db.sequelize.query(record.query, {
            raw: true,
            type: QueryTypes.INSERT
          });
          console.log(result);
        });
    }
    async getOne(temperamentid) {
      return this.AnimalsTemperament.findAll({
        where: {
          TemperamentId: temperamentid
        }
      })
    }
}
module.exports = AnimalTemperamentService;