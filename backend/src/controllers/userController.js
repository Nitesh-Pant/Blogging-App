const db = require('D:/blogging-app/backend/config.js');
const uuid = require('uuid');
const Jwt = require("jsonwebtoken")

const jwtKey = 'blogging'


const getAllUsers = (req, res) => {
    db.query("Select * from users", (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            res.status(200).json(result)
        }
    })
}

const createUser = (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists in the database
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, rows) => {
            if (err) {
                console.error(err);
                throw new Error('Database query error');
            }

            // If rows.length > 0, it means the username already exists
            if (rows.length > 0) {
                return res.status(400).json({ error: 'Username already taken' });
            }

            // If the username is not found, proceed to register the user
            const userId = uuid.v4();

            // Insert the user data (including UUID and hashed password) into the users table
            db.query('INSERT INTO users (id, username) VALUES (?, ?)', [userId, username], (insertErr, result) => {
                if (insertErr) {
                    console.error(insertErr);
                    throw new Error('Database insert error');
                }

                // Once the user is successfully registered in the users table, proceed to create a UUID for the passwords table
                const passwordId = uuid.v4();

                // Insert the hashed password along with the user's UUID into the passwords table
                db.query('INSERT INTO passwords (id, userId, password) VALUES (?, ?, ?)', [passwordId, userId, password], (passwordInsertErr, passwordResult) => {
                    if (passwordInsertErr) {
                        console.error(passwordInsertErr);
                        throw new Error('Database insert error');
                    }

                    // Respond with a success message once both user and password records are created
                    res.status(200).json({ passwordResult, message: 'User registered successfully' });
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    try {
        db.query(`SELECT * FROM Users WHERE username = '${username}'`, (err, result) => {
            if (err) {
                console.error(err);
                throw new Error('Database query error');
            }
            if (result.length === 0) { // Check if no user with the given username was found
                return res.status(401).send("Invalid Username");
            }
            const userId = result[0].id;

            db.query(`SELECT * FROM Passwords WHERE userId = '${userId}' AND password = '${password}'`, (err, passwordResult) => {
                if (err) {
                    console.error(err);
                    throw new Error('Database query error');
                }
                if (passwordResult.length === 0) { // Check if no matching password was found
                    return res.status(401).send("Invalid Password");
                }
                //res.status(200).send({ userId: userId, message: "User login successfully" });
                Jwt.sign({ result }, jwtKey, { expiresIn: '48h' }, (err, token) => {
                    res.status(200).send({ msg: 'User Loggedin successfully', "userId": userId, token });
                })
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const profileUser = (req, res) => {
    const userId = req.query.userId;
    const query = `Select u.*, b.* from Users u join Blogs b on u.id = b.userId where u.id = '${userId}' order by b.created_at desc`
    try {
        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ error: 'User not found' });
                } else {
                    res.status(200).json(result);
                }
            }
        })
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const meUser = (req, res) => {
    const userId = req.query.userId;
    const query = `Select * from Users where id = '${userId}'`;
    try {
        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({ erro: 'Internal Server Error' })
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ error: 'User not found' });
                } else {
                    res.status(200).json(result);
                }
            }
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    profileUser,
    meUser
}