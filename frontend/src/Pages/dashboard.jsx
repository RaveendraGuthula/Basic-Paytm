import { useNavigate } from "react-router-dom";
import { AppBar } from "../Components/Appbar";
import { Balance } from "../Components/Balance";
import { UserComponent } from "../Components/UserComponent.jsx";
import { useEffect } from "react";

export function Dashboard(){
    const navigate=useNavigate();

    const token=localStorage.getItem("token");
    // console.log(token);
    useEffect(()=>{

        token?navigate("/dashboard"):navigate("/signin");

    },[])
    if(!token){
        return null;
    }
    

    return<div>
        
        <AppBar/>
        <Balance/>
        <UserComponent/>
    </div>
}