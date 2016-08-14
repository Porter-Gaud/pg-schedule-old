module.exports = function(sequelize, DataTypes){
  var Schedule = sequelize.define('schedules', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    date: DataTypes.DATE,
    classes: DataTypes.JSON,
  }, {
    freezeTableName: true
  });
  Schedule.sync();
  return Schedule;
};
