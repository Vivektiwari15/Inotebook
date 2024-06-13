const express = require("express")
const router = express.Router()
const Notes = require("../models/Notes")
const fetchuser  = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');

// Fetching Note of the user of an loged in user
router.get("/getnotes",fetchuser,async (req,res)=>{

    try {
        
        const notes =await Notes.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        return res.status(500).json({error:"Server Error"})   
    }
    
})

// Adding Notes in the note of an loged in user
router.post("/addnotes",fetchuser,[
    body('title',"Title Must be there").isLength({ min: 3 }),
    body('description',"Please enter description").isLength({ min: 3 })
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        
        
        const {title,description,tag} = req.body
        
        const notes = new Notes({
            title,description,tag,
            user:req.user.id
        })
        
        const savedNote = await notes.save()
        
        res.status(200).send(savedNote)
    } catch (error) {
        return res.status(500).json({error:"Server Error"})   
    }
})

// Updating Note of the user of an loged in user
router.put("/updatenotes/:id",fetchuser,async (req,res)=>{

    try {
                
        const {title,description,tag} = req.body
        
    const note  =await  Notes.findById(req.params.id)
    if(!note){return res.status(404).send({error:"User not Found"})}    

    if(note.user.toString() !== req.user.id){return res.status(404).send({error:"User not Found"})}
  
    const newNote  = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    const updatedNotes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    
    res.json(updatedNotes)

} catch (error) {
    return res.status(500).json({error:"Server Error"})   
}
})


// Deleting Note of the user of an loged in user
router.delete("/deletenotes/:id",fetchuser,async (req,res)=>{

    try {

    const note  =await  Notes.findById(req.params.id)
    if(!note){return res.status(404).send({error:"User not Found"})}    

    if(note.user.toString() !== req.user.id){return res.status(404).send({error:"User not Found"})}
  
    const deleteNotes = await Notes.findByIdAndDelete(req.params.id)

    res.json(deleteNotes)

} catch (error) {
    return res.status(500).json({error:"Server Error"})   
}
})




module.exports = router