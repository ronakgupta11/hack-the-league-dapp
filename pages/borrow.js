
import Head from "next/head"
import { BorrowView } from "../views"
import { useState } from "react"
import { abi,address } from '@/constants'
import { useContractRead } from 'wagmi'
import { useAccount } from 'wagmi'



// import { QRCode } from 'react-qr-svg';
import { proofReq } from "@/constants/proofRequest";

const Borrow = (props) => {
  const account= useAccount()



  const [verified,setVerified] = useState(false);

  return (
    <div>
      <Head>
        <title>5ireXPay</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      {!verified && <div className="flex flex-col items-center m-4">
        <p className="m-2">verify your credit eligiblity status below</p>
        {/* <QRCode value={JSON.stringify(proofReq)} level="Q"
        style={{ width: 256 }} /> */}
        <img src="qrcode.png" className="w-80 m-4"></img>
        {console.log(JSON.stringify(proofReq))}
      </div>}
      {verified && <BorrowView />}
    </div>
  )
}

export default Borrow
