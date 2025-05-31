const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: config.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.charger = require("./charger.model.js")(sequelize, Sequelize);

// One-to-Many: A user can create many chargers
db.user.hasMany(db.charger);
db.charger.belongsTo(db.user);

module.exports = db;
