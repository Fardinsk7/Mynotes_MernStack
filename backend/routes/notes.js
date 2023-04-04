const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


//Route 1: fetching all notes from the database from a particular user using GET request login required
router.get('/fetchallnotes',fetchUser, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.errror(error.message);
        res.status(500).send("Internal Server Error")
    }

    
    
})
// router.post('/addnotes',fetchUser,[
//     body('title','Please Enter Title!!!').exists,
//     body('description','Please Enter Description').exists
// ], async (req,res)=>{

// })


//Route 2: Adding Notes to database using POST request login required
router.post('/addnote',fetchUser, [
body('title','Please Enter Title!!!').isLength({min:3}),
body('description','Please Enter Description').isLength({min:3}),
body('tags','Please Enter tags').exists()
],async (req,res)=>{
    //req.body dal ne se hi title description aur tag req.body k apne aap set ho jate hai
    try {
    const{title,description,tags} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({error:errors.array()})
    }

        //Creating New Note
        let note = new  Notes({
            title,description,tags,user: req.user.id
        })
        //Saving Notes
        const savedNote = await note.save()

        //Showing Response
        res.json(savedNote)

    } catch (error) { 
        console.error(error.message)
        res.status(500).send("Some Inter Error")
    }


})



//Route 3: Update an existing Notes using 'PUT request' "/api/notes/updatenote/:id". Login required

router.put('/updatenote/:id',fetchUser,async(req,res)=>{

    try {
        const {title,description,tags} = req.body
    
        //Creating New Notes to Update a particular note
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tags){newNote.tags = tags}
    
        //First find the note if exist or not
        let findednote = await Notes.findById(req.params.id)// Here params means the things that is given in url that is     update/id here we take url id to match with note id and find the particular note to update and if note not exist then not found will send
        if(!findednote){
            return res.status(404).send("Not User Found")
        }
    
        //Now Authenticate the user
        if(findednote.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
    
        findednote = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
        res.json({findednote})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Internal Error")
    }


    
})

//Route 4: Deleting the note of a particular user using 'DELETE request' login required
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{

    try {
        let findednote = await Notes.findById(req.params.id)
    
        //finding the note to delete
        if(!findednote){
            return res.status(404).send("Not Found")
        }
    
        //Authenticate the User
        if(findednote.user.toString() !== req.user.id){
            console.log(findednote.user.toString())
            return res.status(404).send("Not Allowed")
        }
    
        //Deleting the note
        findednote = await Notes.findByIdAndDelete(req.params.id)
    
        res.json({"Success": "Note Deleted Successfully",note:findednote})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Internal Error")
    }

})




module.exports = router