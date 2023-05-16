var jwt = require('jsonwebtoken');
const JWT_secret = "palak1998@";

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and addd id to req object:
    const token = req.header('auth-token')

    if (!token) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }

    try {
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }
}


module.exports = fetchuser;