import Note from "../models/Notes.js";

export async function getAllNotes(_req,res) {

    try {
        const notes=await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({message:'Error fetching notes'});
    }
}

export async function getNoteById(req,res) {
    try {
        const {id}=req.params;
        const note=await Note.findById(id);

        if(!note){
            return res.status(404).json({message:'Note not found!'});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({message:'Error fetching note'});
    }
}


export async function addNote(req,res) {
    const {title, content}=req.body;

    if(!title){
        return res.status(400).json({message:'Title is required!'});
    }

    try {
        const newNote=await Note.create({title, content});
        await newNote.save();
        res.status(201).json({message:'Note added successfully!', note:newNote});
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({message:'Error adding note'});
    }
}

export async function updateNote(req,res) {
    
    try {
        const {id}=req.params;
        const {title,content}=req.body;

        const updatedNote=await Note.findByIdAndUpdate(id,{title,content},{new:true});

        if(!updatedNote){
            return res.status(404).json({message:'Note not found!'});
        }
        res.status(200).json({message:'Note updated successfully!', note:updatedNote});
        
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({message:'Error updating note'});
    }
}

export async function deleteNote(req,res) {
    
    try {
        const {id}=req.params;

        const deletedNote=await Note.findByIdAndDelete(id);

        if(!deletedNote){
            return res.status(404).json({message:"Note not found!"});
        }
        res.status(200).json({message:'Note deleted successfully!'});
        
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({message:'Error deleting note'});
    }
}