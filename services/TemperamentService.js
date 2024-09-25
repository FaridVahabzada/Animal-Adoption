const fs = require('fs');
const { QueryTypes } = require('sequelize');
const db = require('../models');
class TemperamentService {
    constructor(db) {
        this.client = db.sequelize;
        this.Temperament = db.Temperament;
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
    async getAll() {
      return this.Temperament.findAll({
          where: {}
      })
    }
    async updateOne(temperamentid, temperament) {
      return this.Temperament.update({
        Temperament: temperament
      },{
        where: {
          TemperamentId: temperamentid
        }
      })
    }
    async deleteOne(temperamentid) {
      return this.Temperament.destroy({
          where: {
            TemperamentId: temperamentid
          }
      })
    }
    async addOne(temperamentname) {
      return this.Temperament.create({
        Temperament: temperamentname
      })
    }
}
module.exports = TemperamentService;