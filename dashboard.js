//importing packages
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth')

//initialize
const app = express();

//set-up middleware
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.use('/auth', authRoutes);

//start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
