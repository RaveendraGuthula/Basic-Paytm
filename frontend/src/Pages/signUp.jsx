import {  InputBox } from "../Components/InputBox";
import { Heading } from "../Components/Heading";
import { Subheading } from "../Components/Subheading";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
import {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
        const [firstName,setFname]=useState("");
        const [lastName,setSname]=useState("");
        const [username,setUsername]=useState("");
        const [password,setPassword]=useState("");
        const navigate =useNavigate();
     async function Signup(){
    
        // console.log({firstName,lastName,username,password});
        const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
            username,password,firstName,lastName
           },
    )
        console.log(response.data);
        
        navigate("/dashboard?username="+username);
        
    }
    return<div className="bg-slate-700 h-screen flex justify-center  ">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80  p-2 h-max px-4">
        <div className="text-center"> 

        <Heading  label={"SignUp"}/>
        <Subheading label={"Enter your infromation to create an account"}/>
        <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=>setFname(e.target.value)}/>
        <InputBox label={"Last Name"} placeholder={"Doe"}  onChange={(e)=>setSname(e.target.value)}/>
        <InputBox label={"Email"} placeholder={"John@gmail.com"}onChange={(e)=>setUsername(e.target.value)}/>
        <InputBox label={"password"} placeholder={"123456"}onChange={(e)=>setPassword(e.target.value)}/>
        <Button label={"Sign up"} onClick={Signup} />
        <BottomWarning label={"Already have an account? "} buttonText={"Signin"} to={"/signin"}></BottomWarning>
        </div>
        </div>
        </div>
    </div>
}