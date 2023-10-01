const Jwt = require("jsonwebtoken")

const jwtKey = 'blogging'

// verify jwt token
function tokenVerification(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) res.status(401).send("Please provide valid token")
            else next()
        })
    }
    else {
        res.status(403).send("Please provide token")
    }
}

module.exports = {
    tokenVerification
}