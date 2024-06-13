const jwt = require("jsonwebtoken")
const secretKey = "d%$D^Sd77a^ds*7s&87D6"

const fetchuser  = (req,res,next)=>{

    const token = req.header("authToken")

    if(!token){
        res.status(401).send({error:"token Not availaible"})
    }
    
    try {
        
        const data = jwt.verify(token,secretKey)
        req.user = data.user
        next();

    } catch (error) {
        
        res.status(401).send(error)
    }

}

module.exports = fetchuser