
const jwtPassword= require("../Config");
const jwt=require("jsonwebtoken");


module.exports= function Authentication(req,res,next){

    try{    
        // var username= req.headers.username;
    var token=req.headers.authorization;
    console.log(token);
    
    if(!token ||!token.startsWith("Bearer ") ){
        return  res.status(404).json({mess:"invalid"})
    }
    const tokenArr=token.split(" ");
    const JwtToken=jwt.verify(tokenArr[1],jwtPassword);
        console.log(JwtToken);
    
        if(JwtToken){
            req.user=JwtToken.userId;
          return  next();
        }
    }
    catch(err){
        console.log(token);
        console.log(username);
       return res.status(404).json({mess:"error"})
    }
    
    return res.status(404).json({mess:"TryAgain"})
    
}



// module.exports={Authentication};