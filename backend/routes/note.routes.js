const express = require("express");
const { addNote, editNote, getAllNotes, deleteNote, updateNotePinned, searchNotes } = require("../controllers/note.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.put("/update-note-pinned/:noteId", authenticateToken, updateNotePinned);
router.get("/search-notes", authenticateToken, searchNotes);

module.exports = router;
