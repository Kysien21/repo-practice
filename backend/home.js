const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const uploadRoute = require('./routes/upload');
const analysisRoute = require('./routes/analysis');
const resultRoute = require('./routes/result');
const multer = require('multer')

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Resume Optimization API')
})

//middlewares
app.use(cors({
    origin: 'http://localhost:5173', // frontend port
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true only if using HTTPS
        sameSite: 'lax'
    }

}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/', signupRoute)

app.use('/', loginRoute)

app.use('/', uploadRoute)

app.use('/', analysisRoute)

app.use('/', resultRoute)


//mongodb
const dbURI = 'mongodb+srv://project:aj09126366384@cluster1.gqpv0pu.mongodb.net/resumeDB?retryWrites=true&w=majority&appName=Cluster1';


mongoose.connect(dbURI)
    .then((result) => {
        console.log('✅ Nakakonek sa MongoDB')
        app.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
        })
    })
    .catch(err => console.log('❌ Error:', err))