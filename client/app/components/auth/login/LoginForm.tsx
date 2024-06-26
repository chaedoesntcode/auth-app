'use client';

import React from 'react'
import Link from 'next/link';
import { useUserContext } from '@/context/userContext';

function LoginForm() {

  const { loginUser, userState, handleUserInput } = useUserContext(); 

  const { name, email, password } = userState;

  const [showPassword, setShowPassword] = React.useState(false);

  const toggler = () => setShowPassword(!showPassword);

  return (
    <section className='w-full max-w-[400px]'>
    <form className='px-10 py-14 rounded-lg bg-white shadow-sm w-[90%] mx-auto'>
    <i className="fa-solid fa-shapes text-[#1868db] text-3xl text-center w-full mb-4"></i>
        <div className='relative z-10'>
            <h1 className='mb-2 text-center text-[#282828] text-[1.35rem] font-medium'>Sign in to your account</h1>
            <div className="flex flex-col mb-4">
                <label htmlFor="email" className='mb-1 text-[#414141] font-medium'>Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => handleUserInput("email")(e)} className='p-2 border-[2px] outline-[#1868db] text-gray-800 rounded-md' placeholder='example@domain.com'/>
            </div>
            <div className="flex flex-col relative">
                <label htmlFor="password" className='mb-1 text-[#414141] font-medium'>Password</label>
                <input type={showPassword ? "text" : "password"}  id="password" name="password" value={password} onChange={(e) => handleUserInput("password")(e)} className='p-2 border-[2px] outline-[#1868db] text-gray-800 rounded-md' placeholder='*********'/>
                <button type="button" onClick={toggler} className='absolute px-3 py-1 right-2 top-[46%] text-[18] opacity-45 bg-[#e4e4e4] hover:opacity-60 transition-opacity rounded-md'>
                    { 
                        showPassword ? (<i className='fas fa-eye-slash'></i>)  : (<i className='fas fa-eye' onClick={toggler}></i>) 
                    }
                </button>
            </div>
            {/* <div className='mt-2 flex justify-end'>
                <Link href='/forgot-password' className="text-[#1868db] text-sm font-medium">Forgot password?</Link>
            </div> */}
            <div className="flex">
                <button type='submit' 
                onClick={loginUser}
                className='mt-6 px-4 py-3 flex-1 bg-[#1868db] text-white rounded-md'
                disabled={!userState.email || !userState.password}
                style={{
                    opacity: !userState.email || !userState.password ? 0.7 : 1,
                }}
                >Sign in</button>
            </div>
        </div>
    </form>
    <p className='mt-4 px-[2rem] text-center text-[#545454]  text-[14px]'>
    Don't have an account? {" "}
    <Link href='/register' className="text-[#1868db] font-medium">Sign up</Link>
</p>
    </section>
  )
}

export default LoginForm;