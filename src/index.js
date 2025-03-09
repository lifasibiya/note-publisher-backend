import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/notes', async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

