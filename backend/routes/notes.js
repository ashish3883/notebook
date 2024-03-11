const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { getByTitle } = require('@testing-library/react');


//Route 1: Get all the notes using : GET"/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
});

//Route 2: Add new note using : POST"/api/notes/addnote". Login required.
router.post("/addnote", fetchuser, [
    body('title', "Enter valid title").isLength({ min: 3 }),
    body('description', "Enter valid description").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are errors, request bad request & errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
});

//Route 3: Update a note using : PUT"/api/notes/updatenote/:id". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the note to be updated & update it.
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        };

        //find the user who updating the note & authenticate.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        
        res.json({note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
});

//Route 4: Delete a note using : DELETE"/api/notes/deletenote/:id". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //find the note to be deleted & delete it.
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        };

        //find the user who updating the note & authenticate.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted", note : note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
});

module.exports = router;