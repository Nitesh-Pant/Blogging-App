const db = require('D:/blogging-app/backend/config.js');

const createBlog = (req, res) => {
    const { userId, title, blog, tags } = req.body;

    try {
        db.query(`INSERT INTO blogs (userId, title, blog, tags) VALUES (?, ?, ?, ?)`, [userId, title, blog, tags], (err, result) => {
            if (err) {
                console.error(err);
                throw new Error('Database insertion error');
            }
            res.status(201).send({ message: "Post uploaded successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllBlogs = (req, res) => {
    const tag = req.query.tag;
    let query;
    if (tag === 'All') query = `Select b.*, u.username from blogs b join users u on b.userId = u.id order by created_at desc`
    else query = `Select b.*, u.username from blogs b join users u on b.userId = u.id where tags like '%${tag}%' order by created_at desc;`

    try {
        db.query(query, (err, result) => {
            if (err) {
                console.error(err);
                throw new Error('Database insertion error');
            }
            res.status(200).send(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchBlogs = (req, res) => {
    const query = req.query.query;

    let q = `Select b.*, u.username from blogs b join users u on b.userId = u.id where b.title like '%${query}%' or b.blog like '%${query}%' order by created_at desc`
    try {
        db.query(q, (err, result) => {
            if (err) {
                console.log(err)
                throw new Error('Database querying error')
            }
            res.status(200).send(result)
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    searchBlogs
}