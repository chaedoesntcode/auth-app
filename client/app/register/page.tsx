'use client'
import React from 'react'
import RegisterForm from '../components/auth/register/RegisterForm'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

function page() {
  const navLinks = [
    {title: 'Home', href: '/'},
    {title: 'About', href: '/about'},
    {title: 'Contact', href: '/contact'},
]; 

const pathname = usePathname()
  return (
    <>
    {/* <header className='bg-[#f6f6f6] w-screen h-auto py-4 px-10'>
      <nav className='flex justify-between items-center'>
      <div className='flex items-center gap-1 text-[#1868db]'>
        <i className="fa-solid fa-droplet text-1xl"></i>
        <p className='text-2xl font-bold'>Drop</p>
      </div>
      
      <ul className='hidden xl:flex text-1xl gap-x-4'>
                {navLinks.map((item, index) => (
                <li  className='hover:text-[#1868db] transition-colors' key={index}>
                    <Link href={item.href} className={`link ${pathname === item.href ? 'active' : ''}`}>{item.title}</Link>
                </li>
                ))}
            </ul>
      </nav>
      </header> */}
      <div className='main-page w-full flex flex-col justify-center items-center'>
      
      <RegisterForm />
  </div>

    </>
  )
}

export default page