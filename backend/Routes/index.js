const {Router}=require("express");
const userRoute=require("./User");
const AccountRoute  = require("./Accounts");
const router=Router();
router.use("/user",userRoute);
router.use("/account",AccountRoute);
module.exports=router;




// mistakes
// hear i forgot to add "/" in fornt of user in the 4th line 