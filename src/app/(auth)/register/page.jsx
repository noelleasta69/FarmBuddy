"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import AuthLayout from "../AuthLayout";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({
    type: "farmer",
    name: "",
    mobile: "",
    address: "",
    password: "",
    specialization: "",
    consultationFees: 0
  });
  const router = useRouter();

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', data);
      if (res.status !== 200) throw new Error("Error while registering");
      
      window.alert("Register successfully");
      router.push("/login");
    } catch (error) {
      window.alert("Server error");
    }
  }

  return (
    <AuthLayout>
      <p className="font-bold text-xl">Register</p>
      <form method="POST" onSubmit={handleSubmitForm} className="h-auto w-[25rem] mt-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="">Who are you</label>
          <select onChange={handleOnChangeInput} value={data.type} name="type" className="h-[2.5rem] border-2 border-black rounded-md px-2">
            <option value="farmer">Farmer</option>
            <option value="worker">Labour</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="">Name</label>
          <input onChange={handleOnChangeInput} value={data.name} type="text" name="name" className="h-[2.5rem] border-2 border-black rounded-md px-2 text-md" required />
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="">Mobile Number</label>
          <input onChange={handleOnChangeInput} value={data.mobile} type="text" name="mobile" className="h-[2.5rem] border-2 border-black rounded-md px-2 text-md" required />
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="">Pincode</label>
          <input onChange={handleOnChangeInput} value={data.address} type="number" name="address" className="h-[2.5rem] border-2 border-black rounded-md px-2 text-md" required />
        </div>
        {data.type === "doctor" && (
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="">Specialization</label>
            <input onChange={handleOnChangeInput} value={data.specialization} type="text" name="specialization" className="h-[2.5rem] border-2 border-black rounded-md px-2 text-md" required />
          </div>
        )}
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="">Password</label>
          <div className="flex items-center border-2 border-black rounded-md overflow-hidden">
            <input onChange={handleOnChangeInput} value={data.password} type={isVisible ? "text" : "password"} name="password" className="h-[2.5rem] w-[90%] outline-0 px-2 text-md" required />
            {isVisible ? (
              <HiOutlineEye onClick={() => setIsVisible(!isVisible)} size={20} className="cursor-pointer" />
            ) : (
              <HiOutlineEyeOff onClick={() => setIsVisible(!isVisible)} size={20} className="cursor-pointer" />
            )}
          </div>
        </div>
        <button type="submit" className="w-full p-2 mt-4 bg-[#32a84b] text-white font-semibold rounded-md">Register</button>
      </form>
      <p className="text-sm mt-4">Already have an account? <Link href="/login" className="cursor-pointer">Login</Link></p>
    </AuthLayout>
  )
}

export default Page;
