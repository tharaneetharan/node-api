require('dotenv').config();

const server = require('./server');
const db = require("./lib");

const PORT = process.env.PORT || 3300;

db.sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
