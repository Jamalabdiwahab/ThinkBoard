
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from './routes/notes.routes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;
const __dirname=path.resolve();

if(process.env.NODE_ENV === "dev"){

    app.use(cors({
        origin:"http://localhost:5173"
    }
    ))
}
app.use(express.json());
app.use(rateLimiter)

app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === "prod"){
    app.use(express.static(path.join(__dirname,"../client/dist")))
    app.use((req,res)=>{
       res.sendFile(path.join(__dirname,"../client","dist","index.html"))
    }) 
}
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
});