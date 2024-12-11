// Importing packages
const express = require('express');
const path = require('path');

// Initialize the Express app
const app = express();

// Set up middleware
app.use(express.static(path.join(__dirname, '/'))); // Serve static files like CSS, JS, and images
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve the booking page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'book_appointment.html'));
});

// Handle form submission from `book_appointment.html`
app.post('/book_appointment', (req, res) => {
    const { name, doctor_name, date, time } = req.body;
P
    // Validate required fields
    if (!name || !doctor_name || !date || !time) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Simulate saving the booking in a database
    console.log('Booking Details:', {
        name,
        doctor_name,
        date,
        time,
    });

    // Respond to the client
    res.status(200).json({ message: 'Booking request received!' });
});

// Start the server
const PORT = process.env.PORT || 3001; // Default to port 3001 if PORT is undefined
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
