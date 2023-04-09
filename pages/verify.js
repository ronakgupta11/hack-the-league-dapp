import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';




export default function Verify(){

    const router = useRouter();

    const [pan,setPan] = useState("");
    const [email,setEmail] = useState("");
    const [data,setData] = useState(false);
    const handleClick = async () => {
        const response = await fetch("/api/emailVerify", {
          method: "POST",
          body: JSON.stringify({ email:email }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        // console.log("status:",data);
        setData(data.status);
        return(data.status);
      }

    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePan(e){
        setPan(e.target.value);
    }
    async function routeLink(){
        const res = await handleClick();
        if(res){
        router.push("https://issuer-demo.polygonid.me/")}
        else{
            router.push("/NotEligible")
        }

    }
    function routePan(){
        router.push("/NotEligible")
    }

  return (
    <div className="md:hero mx-auto p-4">
    <div className="md:hero-content flex flex-col">
      <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
        Verify
      </h1>
      <div className="text-center flex flex-col items-center">
        <div className=' flex flex-col items-center m-4 mb-12'>

      <input onChange={handleEmail} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 m-2 text-black rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" placeholder='Enter Edu mail' ></input>
      <button  className='btn btn-ms rounded-btn m-2'  onClick={routeLink}>Verify Edu Email</button>
        </div>
        <div className=' flex flex-col items-center m-4'>

      <input onChange={handlePan} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 m-2 text-black rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" placeholder='Enter Pan Number'></input>
      <button className='btn btn-ms rounded-btn m-2' onClick={routePan}>Verify Pan</button>
        </div>
      </div>
    </div>
  </div>
  )
}
