"use client"
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const AuthLayout = ({children}) => {
  return (
    <div className="relative h-screen w-screen bg-white flex">
      <div className="absolute left-6 top-4">
        <Link href="/"><IoArrowBackCircleOutline size={30} className="text-black"/></Link>
      </div>
      <div className="w-[40%] h-full text-black flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="w-[60%] h-full bg-[#16513F]">
      </div>
    </div>
  )
}

export default AuthLayout
