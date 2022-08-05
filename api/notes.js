const noteService = require("../lib/services/noteService");

const get = async (req, res, next) => {
    try {
        let notes = await noteService.getAll(req.query);
        res.json(notes);
    }
    catch (error) {
        next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        let notes = await noteService.getAll({ id: req.params.id });
        if (notes && notes.length === 1) {
            res.json(notes[0]);
        } else {
            res.status(404).send({
                message: `Cannot find Note with id=${req.params.id}.`
            })
        }
    }
    catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        if (!req.body.description || !req.body.content) {
            res.status(422).send({
                message: "Mandatory fields not found"
            });
            return;
        }

        let created = await noteService.createNote(req.body);
        res.status(201).json(created);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    get,
    getOne,
    create
}