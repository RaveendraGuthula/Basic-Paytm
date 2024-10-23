// const express=require("express");
// const router=express.Router();

// or

const {Router}=require("express");     // we are decripting Router from express
const router=Router();
const jwt =require("jsonwebtoken");
const jwtPassword = require("../Config.js");
const {User, Account} =require("../db.js")
const zod=require("zod");
const Authentication = require("./Authentication.js");


console.log("djfdfjffffffffff");

function validation(details){
    
    const Schema=zod.object({
        username:zod.string().email(),
        password:zod.string().min(6),
        firstName:zod.string(),
        lastName:zod.string()
    });
    const response=Schema.safeParse(details);
    return response;
}

// function (){

// }

router.post("/signup",async(req,res)=>{
   
    // console.log("djfdfj");
    try{
            const details=req.body;
            const check= await User.findOne({username:details.username,
                                    password:details.password});
                const valid=validation(details);
                console.log(details);
                if(!valid.success){
                    return res.status(404).json({mess:"Incorrect inputs"})
                }
                else if(check){
                    return res.status(404).json({mess:"Email already taken "})
                }
                
                var user= await User.create({
                    username: details.username,
                    password: details.password,
                    firstName: details.firstName,
                    lastName: details.lastName,
                })
                
                await Account.create({
                        userId:user._id,
                        balance:Math.floor(Math.random()*10000),
                    });
                    var token=jwt.sign({userId:user._id},jwtPassword);
                    
                }
                catch(err){
                    console.log(user);
                 return res.status(404).json({mess:"error"})
    }

    // res.header('authenication',token);
    // res.header("Authentication",token);
    res.header('Authorization', token);
    // res.setHeader('Authorization', `Bearer ${token}`); 


    return res.status(200).json({mess:" User created successfully", token});
    
})


router.post("/signin", (req,res,next)=>{
        const details=req.body;
        const Schema= zod.object({
            username:zod.string().email(),
            password:zod.string()
        })
        console.log(details)
        const responses = Schema.safeParse(details)
        
        if(!responses.success){
            return res.status(404).json({mess:"Error while logging in "})
        }
        next();

    },async(req,res)=>{
        try{
            const details =req.body;
            const user= await User.findOne({username:details.username,password:details.password});

            if(!details ||!user){
             return   res.status(411).json({mess:"Error while logging in"})
            }
            else{
                var token = jwt.sign({userId:user._id},jwtPassword);

            }
        }
        catch(err){
            return res.status(411).json({mess:"error"});
        }
        
    return res.status(200).json({token});
})


router.put("/",Authentication,async(req,res)=>{
    
    try{
    const details = req.body;
    var userid =  req.user;
    var user=await User.updateOne({_id:userid},details);
    if(!user){
        return res.status(411).json({mess:"Error while updating infornation"});

    }
}
catch(err){
    return res.status(411).json({mess:"Error while updating information"})
};

return res.status(200).json({mess:"Updated successfully"})
})



router.get("/bulk",async(req,res)=>{
    
   try{
    const username=req.headers.username;
    const filter=req.query.filter ||"";
    var check=await User.find({
        $or:[{
            firstName:{"$regex":filter}
        },
        {
            lastName:{"$regex":filter}

        }
    ]
    });
  
    if(!check){
        return res.status(200).json({mess:"user doesnot exists"});
    }

    var filteredWithout_user=check.filter((user)=>{
        return user.username!=username;
    })
    
    var filtereduser = filteredWithout_user.map((user)=>{
            
      return {  firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id}
        })
    

}
catch(err){
    return res.status(404).json({mess:"error"});
}

return res.status(200).json({"users":filtereduser});
});


router.get("/me",Authentication,async(req,res)=>{
   try{ 
        const userId=req.user;
        const user=await User.findOne({_id:userId});

        if(!user){
        return res.status(404).json({mess:"try again"});
        }
        return res.status(200).json({user});
 }
 catch(err){
    return res.status(404).json({mess:"invalid username"})
 }
})


module.exports=router;



