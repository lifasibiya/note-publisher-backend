import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/notes', async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
})

app.post('/api/create', async (res, req) => {
    const { title,content } = req.body;

    if (!title || !content) {
        return res.status(400).send({error: 'Title and content are required'});
    }

    try {
        const note = await prisma.note.create({
            data: {title, content}
        })
        res.json(note);
    } catch (error) {
        res.status(500).send({error: 'An error occurred while creating the note'});
    }

})

app.put('/api/update/:id', async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params.id;

    console.log('req.params', req.params);

    if (!title || !content || !id || isNaN(Number(id))) {
        return res.status(400).send({error: 'Title and content are required'});
    }

    try {
        const noteUpdate = await prisma.note.update({
            where: {id},
            data: {title, content}
        })

        res.json(noteUpdate);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
})

app.delete('/api/delete/:id', async (req, res) => {
    const { id } = req.params.id;

    if (!id || isNaN(Number(id))) {
        return res.status(400).send({error: 'Invalid note id'});
    }

    try {
        await prisma.note.delete({
            where: {id}
        })

        res.status(204).send();
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})


