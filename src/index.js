import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('api/notes', (req, res) => {
    res.json({message: 'Success'});
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

