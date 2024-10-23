export function Button({label,onClick}){
    return <div className={" py-3 text-sm "}>
           <button onClick={onClick} type="button" className={"w-full  hover:bg-gray-800  p-2 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 text-white text-center  "}>{label}</button> 
        
    </div>
}