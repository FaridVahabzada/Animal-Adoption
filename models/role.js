module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
        RoleId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Role: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: 'Member'
        }
    }, {
        timestamps: false
    });
    Role.associate = function(models) {
        Role.hasMany(models.User, { foreignKey: 'RoleId'});
    };
    return Role;
};