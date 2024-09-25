module.exports = (sequelize, Sequelize) => {
    const Species = sequelize.define('Species', {
        SpeciesId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Species: Sequelize.DataTypes.STRING
    }, {
        timestamps: false
    });
    Species.associate = function(models) {
        Species.hasMany(models.Animal, { foreignKey: 'SpeciesId'});
    };
    return Species;
};