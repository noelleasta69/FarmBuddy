"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaRupeeSignSolid } from "react-icons/lia";
import LabourPageLayout from "../LabourPageLayout";

const page = () => {

    const [allWorks, setAllWorks] = useState([]);
    const [add, setAdd] = useState('');
    

     const getData = async()=>{
            try {
                const res = await axios.get("/api/getWorks");

                if(res.status !== 200) throw new Error("Error");

                const data = await res.data.data;
                console.log(data);

                setAdd(data.add);
                setAllWorks(data.works);
            } catch (error) {
                console.log(error.message);
                window.alert("Error");
            }
        }

    useEffect(()=>{
       

        getData();
    }, [])


    const handleOnClick = async(workId)=>{
        try {
            const user = JSON.parse(window.localStorage.getItem("user"));
            const res = await axios.post("/api/worker", {workerId: user._id, workId: workId})
            console.log('response recieved 0',res)
            

            if(res.data.success){

                setAdd(res.add);
                setAllWorks(res.works);
            }
            
        } catch (error) {
            console.log(error.message);
            window.alert("Error");
        }
    }



    return (
        <LabourPageLayout>
            <div className="h-[15rem] bg-green-950/10 flex items-center justify-center">
                <div className="h-[3rem] w-[60%] bg-white drop-shadow-lg mt-10 rounded-full overflow-hidden flex">
                    <div className="h-full w-[10%] flex items-center justify-center border-r-2">
                        INDIA
                    </div>
                    <input type="text"  className="h-full w-[70%] px-5 outline-0" placeholder="Enter pin-code" />
                    <button className="bg-[#32a84b] w-[20%] text-white font-semibold flex items-center justify-center gap-2">
                        <CiSearch size={20} />
                        Find
                    </button>
                </div>
            </div>
            <div className="px-14 mt-4">
                <p className="text-lg font-semibold">Vets near your area</p>
                <div className="flex flex-col items-center mt-5 gap-5">
                    {
                        allWorks.map((item, ind) => (
                            <div key={ind} className="relative h-auto w-[90%] bg-white p-6 flex gap-4 rounded-md drop-shadow-md hover:drop-shadow-xl border">
                                {/* <p className="absolute right-0 top-0 p-2 px-3 bg-[#32a84b] text-white"> 12 June 2023</p> */}
                                <div className="w-[70%]">
                                    <p className="text-lg font-semibold mb-2">{item.jobTitle}</p>
                                    <p><span className="font-semibold">Description:</span> {item.jobDescription}</p>
                                    <p><span className="font-semibold">Address:</span> {add}</p>
                                </div>
                                <div className="w-[20%] flex flex-col justify-center">
                                    <p><span className="font-semibold">Number of labours:</span> {item.totalWorkersRequired}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Pay per hour:</span>
                                        <div className="flex items-center">
                                            <LiaRupeeSignSolid size={20} color="#00000" className="text-black" />
                                           {item.payPerHour}
                                        </div>
                                    </div>
                                    <p><span className="font-semibold">Number of days: </span> {item.totalDays}</p>
                                </div>
                                <div className="w-[8%] flex items-center justify-center">
                                    <button onClick={()=>handleOnClick(item._id)} className="px-6 py-1 hover:bg-[#32a84b] border-2 border-[#32a84b] hover:text-white bg-transparent rounded-md transition">Apply</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </LabourPageLayout>
    )
}

export default page
