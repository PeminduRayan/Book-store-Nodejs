import express, { request, response } from 'express';
import {PORT,mongoDBURL} from './config.js';
import mongoose  from 'mongoose';
import bookRoute from './routes/bookRoute.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// app.use(cors({
//     origin : 'http://localhost:3000',
//     methods : ['GET','POST','PUT','DELETE'],
//     allowedHeaders : ['Content-Type'],
// }));

app.use('/books',bookRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("App connected to the DB");
    
    app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
})
.catch((err) => {
    console.log(err);
});