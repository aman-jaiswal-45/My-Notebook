const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notesController');

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, getNotes);

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser, addNote);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchUser, updateNote);

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchUser, deleteNote);

module.exports = router;