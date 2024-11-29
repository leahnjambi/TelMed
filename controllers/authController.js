const db = require('../config/db');
const bcrypt = require('bcryptjs');

// User registration function/logic
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user exists in the database
        const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'User already exists. Please proceed to login.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12); // Using 12 salt rounds

        // Log parameters to check for undefined values
        console.log({ name, email, hashedPassword });

        // Insert the record into the database
        await db.execute('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [
            name ?? null,
            email ?? null,
            hashedPassword ?? null
        ]);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred.', error });
    }
};
