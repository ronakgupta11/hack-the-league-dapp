
import Head from "next/head"
import { BorrowView } from "../views"
import { useState } from "react"


const Borrow = (props) => {
  const [verified,setVerified] = useState(false);
  return (
    <div>
      <Head>
        <title>5ireXPay</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      {!verified && <div className="flex flex-col items-center m-4">
        <p>verify your credit eligiblity status below</p>
        
      </div>}
      {verified && <BorrowView />}
    </div>
  )
}

export default Borrow
