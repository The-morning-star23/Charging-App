module.exports = (sequelize, DataTypes) => {
  const Charger = sequelize.define("charger", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
    power_output: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    connector_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Charger;
};
