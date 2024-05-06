import React from 'react';
import Logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

function Header() {

  return (
    <header className='bg-[#FAFAFA] w-screen h-auto py-4 px-10 md:px-5 absolute'>
            <div className='flex justify-between items-center flex-col gap-y-2'>
                <div>
                    <Image priority={true} src={Logo} width={200} height={50} className='h-10 object-contain' alt="logo" />
                </div>
                <div className='text-[#515661] text-center mt-2 text-sm'>
                    <p>A Full-Stack authentication app by <Link href='https://www.chae.dev' target="_blank" className='text-[#1868DB] font-medium'>chae.dev</Link></p>
                    <p className='opacity-80 mb-2'>utilizing Node.js, JWT, React.js, Next.js, MongoDB, and Tailwind CSS</p>
                </div>
            </div>
    </header>
  )
}

export default Header;