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

            //destructring from body:
            const { title, description, tag } = req.body;

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

            //saving note into DB:
            const savedNote = await note.save();

            //sending response as json (saved note)
            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }

    })

//Route - 3: get all the notes using PUT: /api/notes/updatenote:
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        //destructring from body:
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//Route - 4: get all the notes using DELETE: /api/notes/deletenote:
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }


})


module.exports = router;