import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

app.use('/api', router);

app.use((err, req, res, next) => {
    res.status(500).json({message: 'oops, server error'});
});

export default app;