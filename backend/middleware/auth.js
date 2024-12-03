const jwt = require("jsonwebtoken");
const secretKey = "admin";

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({ msg: "Falta el JWT.", data: [] });
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if(error) {
            return res.status(403).json({ msg: "JWT inválido.", data: [] });
        }

        req.body.userId = decoded.id;

        next();
    });
}

module.exports = validateToken;