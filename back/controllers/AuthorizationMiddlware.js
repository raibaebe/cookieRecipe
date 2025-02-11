const jwt = require('jsonwebtoken');

//This is middlware function for jwt checking

function verifyToken(req, res, next) 
{
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try 
    {
        const decoded = jwt.verify(token, 'secret-key');
        console.log("decoded is" + decoded);
        req.userId = decoded.userId;
        req.username = decoded.username;
        req.email = decoded.email;
        next();
    } catch (error) 
    {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;