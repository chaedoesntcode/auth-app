import React from 'react';
import Logo from '../../../public/logo.png';
import Image from 'next/image';


function Header() {

  return (
    <header className='bg-inherit w-screen h-auto py-4 px-10 absolute'>
            <div className='flex justify-between items-center'>
                <div>
                    <Image priority={true} src={Logo} width={200} height={50} className='h-12 object-contain' alt="logo" />
                </div>
                <div>

                </div>
            </div>
    </header>
  )
}

export default Header;