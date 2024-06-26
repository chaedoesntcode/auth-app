import React from 'react'
import LoginForm from '../components/auth/login/LoginForm'

function page() {
  return (
    <div className='main-page w-full h-full flex justify-center items-center pt-[156px] lg:pt-[128px]'>
        <LoginForm />
    </div>
  )
}

export default page