'use client';

import Sidebar from "./components/auth/user/Sidebar";

export default function Home() {
  // const user = useUserContext();

  const name = "Jane Doe";
  const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna";
  return (
    <main className="main-page w-full pt-[80px]">
      <div className="grid grid-flow-col auto-cols-max gap-2 mx-auto justify-items-center align-items-stretch content-center justify-center">
          {/* START: Sidebar */}
       <Sidebar />
        {/* END: Sidebar */}
        {/* START: Profile */}
        <section className='w-full max-w-[400px]'>
            <div className='px-10 py-14 rounded-lg bg-white w-full text-center'>
              <i className="fa fa-circle text-black text-4xl w-full mb-4"></i>
              <h1 className='mb-2  text-[#414141] text-[1.35rem] font-medium'>{ name }</h1>
              <p className="text-[#656565]">{ bio }</p>
            </div>
         </section>
        {/* END: Profile */}
      </div>
    </main>
  );
}
