import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../Components/Heading";
import { useEffect, useRef } from "react";
import axios from "axios";

export function Send(){
        const [searchParams]=useSearchParams();
        const id = searchParams.get("id");
        const name=searchParams.get("name");
        const amountRef =useRef(null);
        const navigate =useNavigate();
      useEffect(()=>{  
        if(!id){
         navigate("/dashboard");
        } 
    },[])
    if(!id){
        return null;
    }
    async function sendMoney(){
        const amount=amountRef.current.value;
        try{
            const token= localStorage.getItem("token");
        const responce=await axios.post("http://localhost:3000/api/v1/account/transfer",{
         amount,
         to:id   
        },
        {
            headers:{ 
                       "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`, 
                    }
        }
    )
    alert(`Rs ${amount} successful Transfered to ${name}`);
     console.log(responce.data);
    }
    catch(err){
        console.error(err);
    }
    }


    return<div className="bg-slate-100 h-screen flex justify-center">
    <div className="flex flex-col justify-center h-full" >
    <div className="bg-white w-96 text-center rounded-md p-5 px-4">
      <Heading label={"SendMoney"}/>
        
       
        <div className="   px-3 flex flex-col gap-3 mt-12">

            <div className=" flex justify-start text-xl font-bold ">
                <div className="flex flex-col justify-center font-normal">
                    <div className="bg-green-500 w-10 h-10 rounded-full flex flex-col justify-center text-white">{name.charAt(0)}</div></div>
                <div className="flex flex-col justify-center ml-2">{name}</div>
            </div>

            <div className="flex justify-start font-medium ">
                Amount (in Rs)
            </div>
            <div className="flex justify-start ">
                <input text={"Number"} className="w-full border border-slate-200 p-1 pl-2 rounded-md" placeholder="Enter amount" ref={amountRef}></input>
            </div>

                <button className="w-full border border-slate-200 p-1 rounded-md text-white bg-green-500" onClick={sendMoney}>Initiate Transfer</button>

        </div>



    </div>
    </div>
    </div>
}