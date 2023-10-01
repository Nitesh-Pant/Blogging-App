const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#Inspiron17',
    database: 'bloggingapp'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = db