module.exports = (sequelize, Sequelize) => {
    const Temperament = sequelize.define('Temperament', {
        TemperamentId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Temperament: Sequelize.DataTypes.STRING
    }, {
        timestamps: false
    });
    Temperament.associate = function(models) {
        Temperament.belongsToMany(models.Animal, {through: models.AnimalsTemperament, foreignKey: 'TemperamentId'});
    };
    return Temperament;
};