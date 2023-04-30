const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser');
const Note = require('../Models/Note');
const { body, validationResult } = require('express-validator');



//Route - 1: get all the notes using GET: /api/notes/fetchuser:

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }


})


//Route - 2: get all the notes using POST: /api/notes/adduser:
router.post('/addnote', fetchuser,
    [body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter atleast 5 char description').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } =  req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            }
            )
            const savedNote = await note.save();

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }

    })


module.exports = router;