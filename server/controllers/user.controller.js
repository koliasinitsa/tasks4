const { v4: uuidv4 } = require('uuid');

const pool = require('../db');

class UserController {

    async getAllUsers(req, res) {
        try {
            const result = await pool.query('SELECT * FROM users');
            res.json(result.rows);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }

    async registerUser(req, res) {
        //const id = uuidv4();
        const { name, email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email cannot be empty' });
        }

        try {
            const result = await pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *', [email, password, name]);
            console.log(email, password, name);

            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async blockUser(req, res) {
        const userId = req.params.id;

        try {
            await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['blocked', userId]);
            res.status(200).json({ message: 'User blocked successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async UnblockUser(req, res) {
        const userId = req.params.id;

        try {
            await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['active', userId]);
            res.status(200).json({ message: 'User active successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;

        try {
            await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['deleted', userId]);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}


module.exports = new UserController();