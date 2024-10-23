
export function InputBox({label,placeholder,onChange}){
    // const nameRef=useRef(null);
    // con

    return<div >
            <div className={"font-medium text-sm text-left py-2"}>{label} </div>
            <input onChange={onChange} placeholder={placeholder} className={"w-full px-2 py-1 border rounded border-slate-900"}  ></input>
    </div>
}