import { FC } from "react"
import Link from "next/link"
export const ContentContainer = (props) => {
  return (
    <div className="flex-1 drawer h-52">
      {/* <div className="h-screen drawer drawer-mobile w-full"> */}
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" />
      <div className="items-center  drawer-content " style={{minHeight:"100vh"}}>{props.children}</div>

      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li>
            <h1>Menu</h1>
          </li>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/stake">
              Stake
            </Link>
          </li>
          <li>
            <Link href="/borrow">
              Borrow
            </Link>
          </li>
          <li>
            <Link href="/account">
              Account
            </Link>
          </li>
          <li>
            <Link href="/verify">
              Verify
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
