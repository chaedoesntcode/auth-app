'use client';

import useRedirectUser from "@/hooks/useUserRedirect";
import { Sidebar } from "./components/auth/user/Sidebar";
import { useUserContext } from "@/context/userContext";
import { useState } from "react";

export default function Home() {
    useRedirectUser('/login');
    const { user, logoutUser, handleUserInput, userState, updateUser, loading } = useUserContext();
    const name = user.name;
    const bio = user.bio;
    const photo = user.photo;

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };

  return (
    <main className="main-page w-full pt-[108px] md:pt-[80px]">
      <div className="grid grid-flow-row md:grid-flow-col auto-cols-fr md:auto-cols-max gap-2 mx-auto h-full justify-center items-center content-center">
        {/* START: Profile */}
        <section className='w-full max-w-[400px] h-full rounded-lg'>
            <div className='px-10 py-14 rounded-lg relative bg-white w-full text-center flex flex-col items-center justify-center'>
              <img src={photo} alt={name} className="rounded-full mb-4 h-16" />
              <h1 className='mb-2  text-[#414141] text-[1.35rem] font-medium'>{ name }</h1>
              <p className="text-[#656565]">{ bio }</p>
              {isOpen && <form className="bg-white shadow-sm px-4 py-2 rounded-lg absolute w-full h-full flex flex-col items-center justify-center top-0 left-0">
                    <div className="flex flex-col w-full">
                      <label htmlFor="bio" className="mb-2  text-[#414141] text-[1.35rem] font-medium">Update your bio</label>
                      <textarea className="px-4 py-3 border-[2px] rounded-md outline-[#1868db] h-32 resize-none" name="bio" id="bio"
                        defaultValue={bio} onChange={(e) => handleUserInput("bio")(e)}
                      ></textarea>
                    </div>
                    <button type='submit' className='mt-6 px-6 py-3 bg-[#3aab49] text-white w-full rounded-lg'
                      onClick={(e) => {
                        updateUser(e, { bio: userState.bio });
                        setIsOpen(false);
                      }}
                      disabled={loading} >
                      Save
                    </button>
                </form>}
              <div className="flex w-full gap-2 justify-around mt-6">
                <button type='button' className='px-6 py-3 bg-[#FAFAFA] text-[#414141] rounded-lg'
          onClick={toggle} 
        > <i className="fa fa-pen mr-2"></i> Update Bio
                </button>
                <button type='submit' className='px-6 py-3 bg-[#1868db] text-white rounded-lg'
          onClick={logoutUser}
        >    <i className="fa-solid fa-right-from-bracket mr-2 text-white"></i>
         Sign out
                </button>
              </div>
            </div>
         </section>
        {/* END: Profile */}
      </div>
    </main>
  );
}
