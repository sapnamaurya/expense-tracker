import { pool } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10; // Number of rounds for bcrypt hashing

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExistsQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const existingUser = await pool.query(userExistsQuery, [username, email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const insertUserQuery = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at, updated_at;
        `;
        const newUserResult = await pool.query(insertUserQuery, [username, email, hashedPassword]);
        const newUser = newUserResult.rows[0];

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const findUserQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await pool.query(findUserQuery, [username]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //Comparing the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //Generating a JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email }, // Payload
            JWT_SECRET,
            { expiresIn: '1h' } //expiration time
        );

        const { password: _password, ...userWithoutPassword } = user; // Exclude password
        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};