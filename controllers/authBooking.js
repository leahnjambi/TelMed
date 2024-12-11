const db = require('../config/db');

// User booking function/logic
exports.bookDoctor = async (req, res) => {
    const { name, doctor_Name, date, time } = req.body;

    try {
        // Validate input
        if (!name || !doctor_Name || !date || !time) {
            return res.status(400).json({ 
                message: 'All fields are required: name, doctor name, date, and time.' 
            });
        }

        // Check if the doctor is already booked for the same date and time
        console.log('Checking for existing booking...');
        const [existingBooking] = await db.execute(
            'SELECT * FROM Booking WHERE doctor_Name = ? AND date = ? AND time = ?',
            [doctor_Name, date, time]
        );

        if (existingBooking.length > 0) {
            return res.status(400).json({ 
                message: 'The doctor is already booked for the selected date and time. Please choose a different time or doctor.' 
            });
        }

        // Log parameters to confirm their values
        console.log('Booking details:', { name, doctor_Name, date, time });

        // Insert the booking record into the database
        console.log('Inserting new booking...');
        await db.execute(
            'INSERT INTO Booking (name, doctor_Name, date, time) VALUES (?, ?, ?, ?)',
            [name, doctor_Name, date, time]
        );

        res.status(201).json({ message: 'Doctor booked successfully.' });
    } catch (error) {
        console.error('Error booking doctor:', error); // Log the error for debugging
        res.status(500).json({ 
            message: 'An error occurred while booking the doctor.', 
            error: error.message 
        });
    }
};
