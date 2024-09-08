"use client"
import Link from "next/link"
import FarmerLayout from "../FarmerLayout"

const page = () => {


  return (
    <FarmerLayout>
      <div className="h-screen w-full bg-home-bg bg-cover pt-[3.7rem] px-12 rounded-br-[30rem] text-white flex flex-col gap-2 justify-center">
        <p className="text-5xl font-bold w-[40%]">Empowering Farmers and Workers: Connecting Talent with Opportunities in Agriculture.</p>
        {/* <p className="w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eaque fuga quae officiis vitae sint dolorem similique, illo nobis doloribus!</p> */}
        <Link href="/post-work" className="w-[8rem] rounded-xl px-5 py-2 bg-[#32a84b] text-white border-2  border-[#32a84b] hover:bg-transparent transition">Post Work</Link>
      </div>
    </FarmerLayout>
  )
}

export default page
