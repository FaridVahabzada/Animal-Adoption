module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        UserId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FullName: Sequelize.DataTypes.STRING,
        Username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: Sequelize.DataTypes.STRING,
        RoleId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2
        }
    }, {
        timestamps: false
    });
    User.associate = function(models) {
        User.belongsTo(models.Role, { foreignKey: 'RoleId'});
        User.hasMany(models.Animal, { foreignKey: 'UserId'});
    };
    return User;
};