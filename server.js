require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const todoRouter = require('./routes/todoRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// connection to database

const dbURL = process.env.MONGOOSE_CONNECT_URL;
const port = process.env.PORT || 4000;
console.log('db:', process.env.MONGOOSE_CONNECT_URL);

mongoose.connect(dbURL)
    .then((result) =>{
        app.listen(port, ()=>{
            console.log(`Connected to db and listening to port ${port}`);
        });
    })
    .catch((err)=>{
        console.error('Mongodb connection failed:', err.message);
    })

// middlewares

app.use(cors({
    origin: process.env.CORS_ACCESS,
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
app.use('/api', userRouter);
app.get('/', (req, res) =>{
    res.send('server working fine');
})

