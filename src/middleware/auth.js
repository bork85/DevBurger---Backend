import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";


function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, authConfig.secret);
        req.userId = decoded.id;
        req.userName = decoded.name;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid', details: err.message });
    }
}

export default authMiddleware;
