const Sequelize = require("sequelize");
const config = require("./config");

const env = process.env.NODE_ENV || 'development';

const envConfig = config[env];
const sequelize = new Sequelize(
    envConfig['url'],
    {
        logging: false,
        dialectOptions: {
            ...(env == "development" ? {
                ssl: {
                    require: true, // This will help you. But you will see nwe error
                    rejectUnauthorized: false // This line will fix new error
                }
            } : {})
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notes = require("./models/notes")(sequelize, Sequelize);

module.exports = db;