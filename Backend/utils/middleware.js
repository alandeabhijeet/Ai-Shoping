const jwt = require('jsonwebtoken');
let JWT_SECRET = "secret_key"

module.exports.authenticateToken  = async(req , res , next)=>{
    const token = req.cookies.auth_token || req.headers['authorization']?.split(' ')[1];  // Check both cookie and header for token
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    console.log("verify")
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; 
        console.log("verified")
        next(); 
    }); 
}