import {Router} from 'express';
import { addNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notes.controller.js';

const router=Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/add', addNote);
router.put('/:id',updateNote);
router.delete('/:id', deleteNote);

export default router;