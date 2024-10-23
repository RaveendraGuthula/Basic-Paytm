import axios from "axios";
import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { Subheading } from "../Components/Subheading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const [username,setU]=useState("");
    const [password,setP]=useState("");
    const navigate=useNavigate();
    
    async function Sign(){
        const res=await axios.post("http://localhost:3000/api/v1/user/signin",
            {
                username,password
        })
        localStorage.setItem("token",res.data.token);
        navigate("/dashboard?username="+username);
    }


    return<div className={"bg-slate-700 h-screen flex justify-center"}>
            <div className={"flex flex-col justify-center"}>
                <div className={"bg-white w-80  rounded-lg p-2 px-4" }>
                   <div className="text-center">
                    <Heading label={"Sign in"}/>
                    <Subheading label={"Enter your credentials to access your account"}/>
                    <InputBox label={"UserName"} placeholder={"john"} onChange={(e)=>setU(e.target.value)}/>
                    <InputBox label={"Password"} placeholder={"12345"} onChange={e=>setP(e.target.value)} />
                    <Button label={"Sign in"} onClick={Sign}/>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />    
                   </div>
                </div>
            </div>
    </div>
}