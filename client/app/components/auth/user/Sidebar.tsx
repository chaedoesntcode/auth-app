'use client';
import React from 'react'
import Link from "next/link";
import { useUserContext } from "@/context/userContext";


function Sidebar() {
    const { logoutUser } = useUserContext(); 

  return (
    <div className="bg-white rounded-lg">
    <div className="px-8 py-14 h-full flex flex-col gap-y-5 justify-between">
      <div className="flex flex-col gap-y-1">
        <Link href='/' className="text-[#414141] flex gap-2 items-center hover:bg-[#f6f6f6] transition-colors p-2 rounded-lg">
          <i className="fa-solid fa-house"></i>Home
        </Link>
        <Link href='/update-bio' className="text-[#414141] flex gap-2 items-center hover:bg-[#f6f6f6] transition-colors p-2 rounded-lg">
          <i className="fa-solid fa-user"></i>Update Bio
        </Link>
        <Link href='/update-password' className="text-[#414141] flex gap-2 items-center hover:bg-[#f6f6f6] transition-colors p-2 rounded-lg">
          <i className="fa-solid fa-lock"></i>Update password
        </Link>
      </div>

        <button type='submit' 
        className='px-4 py-3 bg-[#1868db] text-white rounded-lg'
          onClick={logoutUser}
        ><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
        </button>
    </div>
</div>
  )
}

export default Sidebar