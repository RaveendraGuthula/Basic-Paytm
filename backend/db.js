const { default: mongoose } = require("mongoose");
const mongooes=require("mongoose");

mongoose.connect("You have to give your mongodb URL");

const user= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:6
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:5
    }
});


const DataSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const User=mongoose.model("User",user);
const Account=mongoose.model("Account",DataSchema);

module.exports={
    User,
    Account,
};