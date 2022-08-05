const router = require("express").Router();

const notesAPI = require("./notes");

router.get("/", (req, res) => {
    res.json("My tiny notes API");
});

router.get("/notes", notesAPI.get);
router.get("/notes/:id", notesAPI.getOne);
router.post("/notes", notesAPI.create)

module.exports = router;