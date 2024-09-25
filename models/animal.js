module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define('Animal', {
        AnimalId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.DataTypes.STRING,
        Birthday: Sequelize.DataTypes.DATE,
        SpeciesId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        SizeId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        UserId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    });
    Animal.associate = function(models) {
        Animal.belongsTo(models.Species, { foreignKey: 'SpeciesId'});
        Animal.belongsTo(models.Size, { foreignKey: 'SizeId'});
        Animal.belongsToMany(models.Temperament, {through: models.AnimalsTemperament, foreignKey: 'AnimalId'});
        Animal.belongsTo(models.User, { foreignKey: 'UserId'});
    };
    return Animal;
};