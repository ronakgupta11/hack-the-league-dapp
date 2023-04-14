import { useState } from 'react'
// import { FetchNft } from "../../components/FetchNft"
import { abi,address } from '@/constants'
import { useContractRead } from 'wagmi'
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'
import { parseUnits,formatUnits } from 'ethers/lib/utils.js'
import { useAccount } from 'wagmi'
import { BigNumber } from 'ethers'

export const AccountView = ({}) => {
  const zero = BigNumber.from(0);

  const [myStake,setMyStake] = useState(zero);
  const [myBorrow,setMyBorrow] = useState(zero);
  const [amount,setAmount] = useState("0");
  const account= useAccount()




  const readData1= useContractRead({
    address: address,
    abi: abi,
    functionName: 'viewMyStake',
    args:[account.address],

    onSuccess(data) {
        console.log('Success', data)
        // {_hex: '0x00', _isBigNumber: true}
        setMyStake(data);
      },
  })
  const readData2= useContractRead({
    address: address,
    abi: abi,
    functionName: 'viewMyBorrow',
    args:[account.address],

    onSuccess(data) {
        console.log('Success', data)
        // {_hex: '0x00', _isBigNumber: true}
        setMyBorrow(data);
      },
  })
  const withdrawUserFunConfig = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: 'withdrawUser',

    
  });
  const payBorrowerFunConfig = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: 'payEmi',
    args:[amount],
    overrides: {
      value: BigNumber.from(amount.toString()),
    },
  });

  function handleAmountPay(e){
    setAmount(e.target.value)
  }
  const withdrawUserFun  = useContractWrite(withdrawUserFunConfig.config);
  const payBorrowerFun  = useContractWrite(payBorrowerFunConfig.config);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Account
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center flex flex-col items-center">
          {/* <FetchNft /> */}
          <p className='m-2'>{`My Stake: ${formatUnits(myStake.toString())}`}</p>
          <p className='m-2'>{`My Borrow: ${formatUnits(myBorrow.toString())}`}</p>
            {/* <input onChange={handleAmount} ></input> */}
            <button className='btn btn-md rounded-btn m-2' disabled={!withdrawUserFun.write || withdrawUserFun.isLoading} onClick={() => {withdrawUserFun.write?.()}}>Withdraw</button>
            <input onChange={handleAmountPay} className="placeholder:italic m-2 text-black placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" ></input>
            <button className='btn btn-md rounded-btn m-2' disabled={!payBorrowerFun.write || payBorrowerFun.isLoading} onClick={() => {payBorrowerFun.write?.()}}>Pay borrow</button>
            {withdrawUserFun.isSuccess && (
        <div className='text-white'>
          Successfully Withdrawn your Ammount 
          <div>
            <a href={`https://testnet-zkevm.polygonscan.com/tx/${withdrawUserFun.data?.hash}`}>View On zkEVM Explorer</a>
          </div>
        </div>
      )}
      {payBorrowerFun.isSuccess && (
        <div className='text-white'>
          Successfully Paid your Ammount 
          <div>
            <a href={`https://testnet-zkevm.polygonscan.com/tx/${payBorrowerFun.data?.hash}`}>View On zkEVM Explorer</a>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}
