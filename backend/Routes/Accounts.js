const {Router}=require("express");
const router=Router();
const {Account}=require("../db");
const Authentication=require("./Authentication");
const mongoose=require("mongoose");

router.get("/balance",Authentication,async(req,res)=>{
    try{
    const userId =req.user;
    
    var account= await Account.findOne({userId});
    if(!userId&&!account){
        return res.status(404).json({mess:"try after some time"});
    }
    var balance=account.balance;
    }
    catch(err){
        return res.status(404).json({mess:"error"});
    }
    return res.status(200).json({balance});

});


router.post("/transfer",Authentication,async(req,res)=>{
    console.log("dfsdj");
    const session = await mongoose.startSession();
    
    try{
        const {to,amount }=req.body;
        console.log(to,amount)
        const userId = req.user;
        session.startTransaction();
        
        var userAccount= await Account.findOne({userId:userId}).session(session);
        
        if(!userAccount|| userAccount.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({mess:"Insufficient balance"});
        }
        
        const toAccount = await Account.findOne({userId:to}).session(session);
    
    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({mess:"Invalid Account"})
    }
    const dec=await Account.updateOne({userId:userId},{$inc:{balance:-amount}}).session(session);
    const inc =await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    if(dec&&inc){
        await session.commitTransaction();
    return res.status(200).json({mess:"Transfer successful"})
    }

    await session.abortTransaction();
    return res.status(400).json({mess:"Transaction Failed"})
}
catch(err){
    await session.abortTransaction();
    return res.status(400).json({mess:"try again after sometime"});
}
finally{
    session.endSession();       //end session
}
})
module.exports= router;



// mistake
// => wrote router= require(Router);  this is wrong because we have to call the   Router()   like this