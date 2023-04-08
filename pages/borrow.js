
import Head from "next/head"
import { BorrowView } from "../views"

const Borrow = (props) => {
  return (
    <div>
      <Head>
        <title>5ireXPay</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <BorrowView />
    </div>
  )
}

export default Borrow
