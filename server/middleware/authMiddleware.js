const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token." });
    }
};

module.exports = authMiddleware;
