import React from 'react';
import Logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

function Header() {

  return (
    <header className='bg-[#FAFAFA] w-screen h-auto py-4 px-10 md:px-5 absolute'>
            <div className='flex justify-between items-center flex-col lg:flex-row gap-y-2 md:gap-y-0'>
                <div>
                    <Image priority={true} src={Logo} width={200} height={50} className='h-10 object-contain' alt="logo" />
                </div>
                <div>
                    <p className='text-[#515661] text-sm'>a full-stack authentication app by <Link href='https://www.chae.dev' target="_blank" className='text-[#1868DB] font-medium'>chae.dev</Link></p>
                </div>
            </div>
    </header>
  )
}

export default Header;