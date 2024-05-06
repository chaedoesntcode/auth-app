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
    const email = user.email;

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };

  return (
    <main className="main-page w-full pt-[156px] lg:pt-[128px]">
              {/* START: Profile */}
              <section className='w-[90%] md:max-w-[400px] mx-auto h-full rounded-lg'>
            <div className='px-10 py-14 rounded-lg relative bg-white w-full flex flex-col justify-center gap-y-4'>
              <div className="mb-2">
                <h1 className='text-[1.35rem] font-medium'>Welcome {" "}<span className="text-[#1868db] font-semibold">{ name }</span></h1>
                <p className="text-sm text-[#656565] opacity-90">{ email }</p>
              </div>
              
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
              <div className="flex flex-col lg:flex-row w-full gap-2 justify-around mt-6">
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

    </main>
  );
}
