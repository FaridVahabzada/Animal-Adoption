module.exports = (sequelize, Sequelize) => {
    const AnimalsTemperament = sequelize.define('AnimalsTemperament', {},
    {
        timestamps: false
    });
    return AnimalsTemperament;
};