const express = require('express');
const mongoose = require('mongoose');
const URI = `mongodb+srv://ido_adar:239738416@cluster0.uqc6z.mongodb.net/MyPlace`;
const PORT = process.env.PORT || 5000;

const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');

const app = express();

app.use(express.json({ extended: false }));

// CORS:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    next();
})

// Main Routes:
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
})
.catch(error => console.log(error));