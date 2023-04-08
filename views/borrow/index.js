import { useState } from 'react'

import { abi,address } from '@/constants'

import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'
import { parseUnits } from 'ethers/lib/utils.js'
import { useAccount } from 'wagmi'


export const BorrowView = ({}) => {
  const [amount,setAmount] = useState("0");
  const account= useAccount()

  const borrowFunConfig = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: 'borrow',
    args:[amount],

    
  });
  function handleAmount(e){
    setAmount(e.target.value)
  }
  const borrowFun  = useContractWrite(borrowFunConfig.config);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Borrow
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center flex flex-col items-center">
          {/* <FetchCandyMachine /> */}
          <input onChange={handleAmount} className="placeholder:italic m-2 text-black placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" ></input>
            <button className='btn btn-ms rounded-btn m-2' disabled={!borrowFun.write || borrowFun.isLoading} onClick={() => {borrowFun.write?.()}}>borrow</button>
            {borrowFun.isSuccess && (
        <div className='text-white'>
          Successfully Borrowed your Ammount 
          <div>
            <a href={`https://explorer.5ire.network/evm/tx/${borrowFun.data?.hash}`}>View On 5ire Explorer</a>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}
