
import Head from "next/head"
import { AccountView } from "../views"

const Account = (props) => {
  return (
    <div>
      <Head>
        <title>5ireXPay</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <AccountView />
    </div>
  )
}

export default Account
