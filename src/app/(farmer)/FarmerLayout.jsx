"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FarmerLayout = ({ children }) => {

  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const handleLogoutClick = async()=>{
    try {
      const res = await axios.get("/api/auth/logout", {});
      if(res.status !== 200) throw new Error("Error");

      window.alert("Successfully logout");
      window.localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      window.alert("Error while logging out");
    }
  }

  return (
    <div className="relative min-h-screen w-screen bg-white text-black">
      <div className="fixed top-0 h-[3.8rem] w-full bg-white flex px-14 gap-10 items-center justify-between drop-shadow-md z-[100]">
        <h1 className="text-xl font-bold">Easy<span className="text-green-600">Farm</span></h1>
        <div className="flex gap-7 items-center h-full text-[#32a84b] font-semibold">
          <Link href="/home" className="cursor-pointer rounded-md px-3 py-1 outline outline-offset-2 outline-1 hover:bg-slate-400/20 transition">Home</Link>
          <Link href="/post-work" className="cursor-pointer rounded-md px-3 py-1 outline outline-offset-2 outline-1 hover:bg-slate-400/20 transition">Post Work</Link>
          <Link href="/find-vet" className="cursor-pointer rounded-md px-3 py-1 outline outline-offset-2 outline-1 hover:bg-slate-400/20 transition">Find Vet</Link>
          <div className={`relative flex gap-7 items-center h-full px-2`}>
            <div onClick={() => setMenu(!menu)} className={`h-[2.5rem] w-[2.5rem] rounded-full bg-slate-500`}>
            </div>
            {
              menu &&
              <div className="absolute h-auto w-[16rem] bg-white top-[3.8rem] right-0 py-4 rounded-b-md">
                <div className="text-lg h-[3rem] px-8 hover:bg-slate-300 flex items-center cursor-pointer transition">{window.localStorage.getItem("user").name}</div>
                <div onClick={handleLogoutClick} className="text-lg h-[3rem] px-8 hover:bg-slate-300 flex items-center cursor-pointer transition">Logout</div>
              </div>
            }
          </div>
        </div>
      </div>
      {
        menu && <div onClick={()=>setMenu(!menu)} className="fixed inset-0 bg-gray-500 bg-opacity-80 z-[50]"></div>
      }
      {children}
    </div>
  )
}

export default FarmerLayout
