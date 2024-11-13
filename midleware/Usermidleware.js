const jwt = require('jsonwebtoken')


const authMiddleware = (req, res, next) =>{
    const token = req.header('Authorization');

    if(!token) return res.status(401).send("Token is required");
    console.log(token)

    //verify the token
    try{
        const decoded = jwt.verify(token , process.env.Secrete_key)
        console.log(decoded);
        req.user= decoded.userId;

        next();
    }catch(err){
        return res.status(400).send("Invalid token- Access denied!");
    }

}


module.exports = authMiddleware;

