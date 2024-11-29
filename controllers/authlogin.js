const db = require('../config/db');
const bcrypt = require('bcryptjs');

// User login function/logic
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'User does not exist. Please register first.' });
        }

        const user = rows[0];

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        res.status(200).json({ message: 'User logged in successfully.' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred.', error });
    }
};
