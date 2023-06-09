import React, {useState, useEffect } from 'react'
import { abi,address } from '@/constants'
import { useContractRead } from 'wagmi'
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'
import { parseUnits,formatUnits, parseEther } from 'ethers/lib/utils.js'
import { useAccount } from 'wagmi'
import { BigNumber } from 'ethers'


export const Staker = () => {
  const zero = BigNumber.from(0);
    const [totalStake,setTotalStake] = useState(zero);
    const [amount,setAmount] = useState("0");
    const account= useAccount()
    
    const { config } = usePrepareContractWrite({
        address: address,
        abi: abi,
        functionName: 'Stake',
        args:[amount],
        overrides: {
            value: BigNumber.from(amount.toString()),
          },
      });
    
    const readData= useContractRead({
        address: address,
        abi: abi,
        functionName: 'viewTotalStake',
        onSuccess(data) {
            console.log('Success', data)
            // {_hex: '0x00', _isBigNumber: true}
            setTotalStake(data);
          },
      })


      function handleAmount(e){
        setAmount(e.target.value)
        // {console.log(parseUnits(e.target.value))}
      }
      const { data, isLoading, isSuccess, write } = useContractWrite(config);

    


  return (
    <div>
        <div className='flex flex-col items-center'>
          <p className='m-2'>{`Total Stake: ${formatUnits(totalStake)}`}</p>
            {/* <button onClick={getTotalStake}>getTotalStake</button> */}
            <input onChange={handleAmount} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 m-2 text-black rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" ></input>
            <button className='btn btn-ms rounded-btn m-2' disabled={!write || isLoading} onClick={() => {write?.()}}>Stake</button>
            {isSuccess && (
        <div className='text-white'>
          Successfully Staked your Amount
          <div>
            <a href={`https://testnet-zkevm.polygonscan.com/tx/${data?.hash}`}>View On zkEVM Explorer</a>
          </div>
        </div>
      )}
        </div>
    </div>
  )
}
