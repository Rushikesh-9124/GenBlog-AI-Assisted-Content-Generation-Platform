import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(404).json({success: false, message: "Token is undefined!"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData)=>{
        if(err) return res.status(500).json({success: false, message: "Token expired or undefined!"})

        req.user = userData;
        next();
    })
}

