const fs = require('fs');
const { QueryTypes } = require('sequelize');
const db = require('../models');
class SpeciesService {
    constructor(db) {
        this.client = db.sequelize;
        this.Species = db.Species;
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
      return this.Species.findAll({
          where: {}
      })
    }
    async updateOne(speciesid, species) {
      return this.Species.update({
        Species: species
      },{
        where: {
          SpeciesId: speciesid
        }
      })
    }
    async deleteOne(speciesid) {
      return this.Species.destroy({
          where: {
            SpeciesId: speciesid
          }
      })
    }
    async addOne(speciesname) {
      return this.Species.create({
        Species: speciesname
      })
    }
}
module.exports = SpeciesService;