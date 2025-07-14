require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const todoRouter = require('./routes/todoRoutes');

const app = express();

// connection to database

const dbURL = process.env.MONGOOSE_CONNECT_URL;
const port = process.env.PORT;

mongoose.connect(dbURL)
    .then((result) =>{
        app.listen(port, ()=>{
            console.log(`Connected to db and listening to port ${port}`);
        });
    })
    .catch((err)=>{
        console.log(err);
    })

// middlewares

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use((req, res, next) =>{
    console.log(req.method, req.path);
    next();
});

// Routes

app.use('/api/todo', todoRouter);
