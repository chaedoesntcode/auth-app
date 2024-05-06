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
    <div className='main-page w-full flex flex-col justify-center items-center  pt-[156px] lg:pt-[128px]'>
      <RegisterForm />
    </div>
  )
}

export default page