const Note = require('../models/Note');
const { validationResult } = require('express-validator');

// Get all notes for a user
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Add a new note
exports.addNote = async (req, res) => {
    const { title, description, tag } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newNote = new Note({
            title,
            description,
            tag,
            user: req.user.id,
        });
        const note = await newNote.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    const { title, description, tag } = req.body;
    const { id } = req.params;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Find the note to be updated and update it
        let note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Allow update only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        note = await Note.findByIdAndUpdate(
            id,
            { $set: newNote },
            { new: true }
        );
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        
        await Note.findByIdAndDelete(id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};