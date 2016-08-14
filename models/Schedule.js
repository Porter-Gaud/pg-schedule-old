module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('schedules', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.ARRAY,
    email: DataTypes.STRING,
    dnsenseLevel: {
      type: DataTypes.INTEGER,
      field: 'access_level'
    }
  }, {
    freezeTableName: true
  });
  User.sync();
  return User;
};
