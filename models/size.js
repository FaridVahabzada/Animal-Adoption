module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define('Size', {
        SizeId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Size: Sequelize.DataTypes.STRING
    }, {
        timestamps: false
    });
    Size.associate = function(models) {
        Size.hasMany(models.Animal, { foreignKey: 'SizeId'});
    };
    return Size;
};