import axios from "axios";
import { useEffect, useState } from "react"

export function Balance(){
    const [balance,setB]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                        "context-Type":"application/json",
                        "Authorization":"Bearer "+ localStorage.getItem("token")
            }
        })
        .then(res=>setB(res.data.balance))
    },[])

    return<div className="flex justify-start h-14 font-semibold text-lg   pl-4">
        <div className="flex flex-col justify-center">
            Your balance
       </div>
       <div className="flex flex-col justify-center ml-2">
        <div className="flex justify-center">Rs <div className="text-green-600 pl-2">{balance}</div></div>
       </div>
    </div>
}