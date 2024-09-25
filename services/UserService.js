const fs = require('fs');
const { QueryTypes } = require('sequelize');
const db = require('../models');
class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
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
    async create(firstName, lastName, username, password) {
      return this.User.create(
          {
              FullName: firstName + " " + lastName,
              Username: username,
              Password: password
          }
      ) 
    }
    async getOneByName(username) {        
      return await this.User.findOne({
          where: {Username: username}
      });
    }
    async deleteUser(userid) {
      return this.User.destroy({
          where: {
              UserId: userid,
              RoleId: {
                  [Op.not]: 1
              }
          }
      })
  }
}
module.exports = UserService;