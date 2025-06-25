'use client'
import {useState, FormEvent} from 'react';
import Image from "next/image";
import {useRouter} from 'next/navigation'
export default function Home() {
  const [inputVal,setInputVal]= useState("");
  const {push}= useRouter()
  const handle=(event: FormEvent)=>{
    event.preventDefault();
    push(`/Prediction/${inputVal}`);
  };
  return (
    <div className='block flex items-center justify-between min-h-full flex-col justify-center px-6 py-12 lg:px-8 '>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1>Enter Name to Predict</h1>
      </div>
      <form onSubmit={handle}>
        <input type="text" 
        placeholder="Type Your Name.."
        value={inputVal}
        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        onChange={(e)=>setInputVal(e.target.value)}></input>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
      </form>
    </div>
  );
}
