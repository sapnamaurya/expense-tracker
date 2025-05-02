import { pool } from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10; // Number of rounds for bcrypt hashing

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExistsQuery =
      "SELECT * FROM users WHERE username = $1 OR email = $2";
    const existingUser = await pool.query(userExistsQuery, [username, email]);

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const insertUserQuery = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at, updated_at;
        `;
    const newUserResult = await pool.query(insertUserQuery, [
      username,
      email,
      hashedPassword,
    ]);
    const newUser = newUserResult.rows[0];

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email);

  try {
    const findUserQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(findUserQuery, [email]);
    const user = userResult.rows[0];

    if (!user) {
      console.log("User not found for email:", email);
      return res
        .status(401)
        .json({ message: "Invalid credentials: user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      console.log("Password mismatch for email:", email);
      return res
        .status(401)
        .json({ message: "Invalid credentials: wrong password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _password, ...userWithoutPassword } = user; // Exclude password
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
