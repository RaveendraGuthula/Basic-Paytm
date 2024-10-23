import { useEffect, useState } from "react";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import {  useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

// import { use } from "../../../backend/Routes/User";



export function UserComponent(){
    // const [users,setUser]=useState([{
    //     firstName:"Raveeendra",
    //     lastName:"Guthula",
        
    // },
    // { 
    //     firstName:"Harkrith",
    //     lastName:"Singh"  
    // }])
    const [users,setUser]=useState([]);
    const[filter,setfilter]=useState("");
    const[searchParams]=useSearchParams();

    useEffect(()=>{
        const username= searchParams.get("username");
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                "Context-Type":"application/json",
                "Username":username
            }
        })
        .then(res=>{
            setUser(res.data.users);
        console.log(res.data.users)})
    },[filter])
    return<div className="px-5 flex flex-col space-y-2" >
        <div>
            <InputBox label={"Users"} placeholder={"Search user..." } onChange={(e)=>setfilter(e.target.value)}/>

        </div>

        <div className="py-0">{users.map((obj,index)=><Users key={index} user={obj} ></Users>)}</div>

    </div>
}

function Users({user}){
        const navigator=useNavigate();

        return<div className="flex justify-between  ">
            
            <div className="flex font-semibold  ">
                <div className=" flex flex-col justify-center ">
                    <div className=" flex flex-col justify-center rounded-full bg-blue-100 text-center w-8 h-8 ">{user.firstName.charAt(0)}</div>
                </div>
                <div  className="flex flex-col justify-center ml-2 ">{user.firstName} {user.lastName}</div>
            </div>

            <div className="flex flex-col justify-center">
                <Button label={"Send Money"}  onClick={(e)=>
                    navigator("/send?id="+user._id +"&name="+user.firstName) } />
            </div>

        </div>
   
}