import axios from "axios"
import { useEffect, useState } from "react"

export function AppBar(){
    const [user,setuser]=useState(null);
    useEffect(()=>{

        axios.get("http://localhost:3000/api/v1/user/me",{
            headers:{
                "Context-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("token")
            }
        })
        .then(res=>setuser(res.data.user));

    },[])
    if(user==null){
        return;
    }
 

    return <div className="flex justify-between px-2 h-10 shadow-md  font-medium border-t-4 border-slate-950 mx-1 ">
        <div className="flex flex-col justify-center">PayTM</div>
        <div className="flex ">
        <div className="flex flex-col justify-center">{user.firstName}</div>
        <div className="flex flex-col justify-center  ml-1 " >
        <div className="rounded-full w-6 h-6 text-center bg-blue-100 ">{user.firstName.charAt(0)}</div>
        </div>
        
        </div>
    </div>
}