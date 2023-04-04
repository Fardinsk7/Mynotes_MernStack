var jwt = require('jsonwebtoken');
const JWT_SECRET = "Fardinsk.7"


//Yaha par next parameter ek function hai iska kam ye hota h k jab fetchUser function khatam ho jaye toh dusra function start kardo      (harry bhai ki react video number 51)
const fetchUser= (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"Please authenticate using valid token"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user
        next();

    }catch (error) {
        res.status(401).json({error:"Please authenticate using valid token"})
        
    }
}

module.exports = fetchUser;