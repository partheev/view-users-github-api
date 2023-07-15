import express from 'express';
import dotenv from 'dotenv';
import { GithubRoutes } from './routes/github';
import { errorHandler } from './middlewares/errorHandler';
import { HTTP_CODES } from './constants/httpCodes';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

dotenv.config();

app.use(express.static('public'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/health-check', (req, res) => {
    res.send({ message: 'Working........' });
});

app.use('/api/github', GithubRoutes);
console.log(__dirname);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.all('*', (req, res) => {
    res.status(HTTP_CODES.BAD_REQUEST).send({ message: 'Route not found' });
});

/*
 Error handler 
 Catches all errors which occurs in the request handlers and middlewares
*/
app.use(errorHandler);

if (!process.env.TESTING)
    app.listen(process.env.PORT || 3001, () => {
        console.log('Server listening on port ' + (process.env.PORT || 3001));
    });

export default app;
