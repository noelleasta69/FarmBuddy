"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import AuthLayout from "../AuthLayout";

const page = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    const [data, setData] = useState({
        "type": "farmer",
        "mobile": "",
        "password": ""
    });

    const handleOnChangeInput = (e)=>{
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmitForm = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/login", data);
            // console.log(res);
            if(res.status !== 200) throw new Error("Error while login");

            window.alert("Login Successfully");
            const userData = await res.data.user;
            console.log(userData);

            window.localStorage.setItem("user", JSON.stringify(userData));
            console.log(data.type);
            if(data.type === "farmer") router.push("/home");
            else if(data.type === "doctor") router.push("/doctor-home");
            else router.push("/apply-for-work");
            
        } catch (error) {
            window.alert("server error");
        }
    }



    return (
        <AuthLayout>
            <p className="font-bold text-xl">Login</p>
            <form method="POST" onSubmit={handleSubmitForm} className="h-auto w-[25rem] mt-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Who are you</label>
                    <select onChange={handleOnChangeInput} value={data.type} name="type" id="" className="h-[2.5rem] border-2 border-black rounded-md px-2">
                        <option value="farmer">Farmer</option>
                        <option value="worker">Labour</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="">Mobile Number</label>
                    <input onChange={handleOnChangeInput} value={data.mobile} type="text" name="mobile" className="h-[2.5rem] border-2 border-black rounded-md px-2 text-md" />
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="">Password</label>
                    <div className="flex items-center border-2 border-black rounded-md overflow-hidden">
                        <input onChange={handleOnChangeInput} value={data.password} type={`${isVisible ? "text" : "password"}`} name="password" className="h-[2.5rem] w-[90%] outline-0 px-2 text-md" />
                        {
                            isVisible ?
                                <HiOutlineEye onClick={() => setIsVisible(!isVisible)} size={20} className="cursor-pointer" />
                                :
                                <HiOutlineEyeOff onClick={() => setIsVisible(!isVisible)} size={20} className="cursor-pointer" />
                        }
                    </div>
                </div>
                <button type="submit" className="w-full p-2 mt-4 bg-[#32a84b] text-white font-semibold rounded-md">Login</button>
            </form>
            <p className="text-sm mt-4">New to FarmEasy? <Link href="/register" className="cursor-pointer">Register</Link></p>
        </AuthLayout>
    )
}

export default page
