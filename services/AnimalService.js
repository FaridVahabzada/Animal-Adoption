const fs = require('fs');
const { QueryTypes } = require('sequelize');
const db = require('../models');
class AnimalService {
    constructor(db) {
        this.client = db.sequelize;
        this.Animal = db.Animal;
        this.Temperament = db.Temperament;
        this.Size = db.Size;
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
    /*async getAll() {
      return this.Animal.findAll({
          where: {},
          include: [
          {
              model: this.Species
          },
          {
              model: this.Size
          },
          {
            model: this.Temperament,
            attributes: ['Temperament'],
            through: {
              attributes: []
            }
          }
          ]
      })
    }*/
    async getOne(speciesid) {
      return this.Animal.findAll({
        where: {
          SpeciesId: speciesid
        }
      })
    }
    async adoptOne(userid, animalid) {
      return this.Animal.update({
        UserId: userid
      },{
        where: {
          AnimalId: animalid,
          UserId: null
        }
      })
    }
    async cancelOne(animalid) {
      return this.Animal.update({
        UserId: null
      },{
        where: {
          AnimalId: animalid
        }
      })
    }
    async getAll() {
      return await db.sequelize.query("SELECT A.AnimalId, Name, Species, Birthday, GROUP_CONCAT(T.Temperament SEPARATOR ', ') AS Temperament, Size, UserId FROM Animals AS A JOIN Species ON A.SpeciesId=Species.SpeciesId JOIN Sizes ON A.SizeId=Sizes.SizeId JOIN AnimalsTemperaments AS AT ON A.AnimalId = AT.AnimalId JOIN Temperaments AS T ON T.TemperamentId = AT.TemperamentId GROUP BY A.AnimalId", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
    async byAge() {
      return await db.sequelize.query("SELECT A.AnimalId, Name, Species, Birthday, GROUP_CONCAT(T.Temperament SEPARATOR ', ') AS Temperament, Size, UserId FROM Animals AS A JOIN Species ON A.SpeciesId=Species.SpeciesId JOIN Sizes ON A.SizeId=Sizes.SizeId JOIN AnimalsTemperaments AS AT ON A.AnimalId = AT.AnimalId JOIN Temperaments AS T ON T.TemperamentId = AT.TemperamentId GROUP BY A.AnimalId ORDER BY Birthday;", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
    async byAdoption() {
      return await db.sequelize.query("SELECT A.AnimalId, Name, Species, Birthday, GROUP_CONCAT(T.Temperament SEPARATOR ', ') AS Temperament, Size, UserId FROM Animals AS A JOIN Species ON A.SpeciesId=Species.SpeciesId JOIN Sizes ON A.SizeId=Sizes.SizeId JOIN AnimalsTemperaments AS AT ON A.AnimalId = AT.AnimalId JOIN Temperaments AS T ON T.TemperamentId = AT.TemperamentId WHERE UserId IS NOT NULL GROUP BY A.AnimalId;", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
    async byPopularity() {
      return await db.sequelize.query("SELECT A.AnimalId, A.Name, D, Species, Birthday, GROUP_CONCAT(T.Temperament SEPARATOR ', ') AS Temperament, Size, UserId FROM Animals as A JOIN Species ON A.SpeciesId=Species.SpeciesId JOIN Sizes ON A.SizeId=Sizes.SizeId JOIN AnimalsTemperaments as AT ON A.AnimalId = AT.AnimalId JOIN Temperaments as T ON T.TemperamentId = AT.TemperamentId JOIN (SELECT Name, Count(Name) AS D FROM Animals Group BY Name) AS DIS ON DIS.Name=A.Name GROUP BY A.AnimalId ORDER BY D DESC, A.Name;", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
    async byDateRange(startDate, endDate) {
      return await db.sequelize.query("SELECT A.AnimalId, Name, Species, Birthday, GROUP_CONCAT(T.Temperament SEPARATOR ', ') AS Temperament, Size, UserId FROM Animals as A JOIN Species ON A.SpeciesId=Species.SpeciesId JOIN Sizes ON A.SizeId=Sizes.SizeId JOIN AnimalsTemperaments as AT ON A.AnimalId = AT.AnimalId JOIN Temperaments as T ON T.TemperamentId = AT.TemperamentId WHERE Birthday BETWEEN '" + startDate + "' AND '" + endDate + "' GROUP BY A.AnimalId;", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
    async bySize() {
      return await db.sequelize.query("SELECT A.SizeId, Size, COUNT(A.SizeId) AS Count FROM Animals AS A JOIN Sizes ON A.SizeId=Sizes.SizeId GROUP BY A.SizeId;", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
}
module.exports = AnimalService;