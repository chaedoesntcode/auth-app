'use client';

import { useUserContext } from "@/context/userContext";

export default function Home() {
  const user = useUserContext();
  const { logoutUser } = useUserContext(); 


  return (
    
    <main>
        <button type='submit' 
                onClick={logoutUser}
                className='mt-6 px-4 py-3 flex-1 bg-[#1868db] text-white rounded-md'
        
                >Sign out
                </button>

    </main>
  );
}
