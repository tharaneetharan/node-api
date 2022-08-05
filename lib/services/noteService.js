const { notes } = require("../index");

const getAll = async (query) => {
    let where = {};

    if (query.id) {
        where.id = query.id;
    }
    if (query.author) {
        where.author = query.author
    }

    return await notes.findAll({
        where
    });
}

const createNote =  async (note) => {
    let created = await notes.create(note);
    return created;
}

module.exports = {
    getAll,
    createNote
}