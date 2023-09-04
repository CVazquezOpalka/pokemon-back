const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "tipo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
