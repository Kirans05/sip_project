import { useRouter } from 'next/router'
import React from 'react'
// import {AiFillHome} from "react-icons/ai"
// import {GrTransaction} from "react-icons/gr"
// import {RiCustomerService2Fill} from "react-icons/ri"
// import {VscAccount} from "react-icons/vsc"

const BottomMenu = () => {
    const router = useRouter()
  return (
    <div className='flex flelx-col md:hidden justify-between fixed bottom-0 w-full p-2  bg-white'>
        <div className='flex flex-col items-center' onClick={() => router.push("/Dashboard")}>
            {/* <AiFillHome className='text-md'/> */}
            <h1 className='text-sm'>Home</h1>
        </div>
        <div className='flex flex-col items-center' onClick={() => router.push("/Transactions")}>
            {/* <GrTransaction className='text-md'/> */}
            <h1 className='text-sm'>Transaction</h1>
        </div>
        <div className='flex flex-col items-center' onClick={() => router.push("/CustomerSupport")}>
            {/* <RiCustomerService2Fill className='text-md'/> */}
            <h1 className='text-sm'>Customer Support</h1>
        </div>
        <div className='flex flex-col items-center' onClick={() => router.push("/Account")}>
            {/* <VscAccount className='text-md'/> */}
            <h1 className='text-sm'>Account</h1>
        </div>
    </div>
  )
}

export default BottomMenu