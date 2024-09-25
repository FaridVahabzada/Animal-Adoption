const fs = require('fs');
const { QueryTypes } = require('sequelize');
const db = require('../models');
class RoleService {
    constructor(db) {
        this.client = db.sequelize;
        this.Role = db.Role;
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
}
module.exports = RoleService;