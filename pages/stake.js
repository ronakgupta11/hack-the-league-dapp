
import Head from "next/head"
import { StakeView } from "../views"

const Stake = (props) => {
  return (
    <div>
      <Head>
        <title>5ireXPay</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <StakeView />
    </div>
  )
}

export default Stake
