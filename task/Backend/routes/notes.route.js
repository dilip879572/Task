const express = require("express");
const router = express.Router();
const notesCtrl = require("../controller/notes.controller");
router.post("/create", notesCtrl.createNotes);
router.get("/get_notes", notesCtrl.getNotes);
router.delete("/get_notes/:id", notesCtrl.deleteNotes);
router.put("/get_notes/:id", notesCtrl.updateNotes);
module.exports = router;
