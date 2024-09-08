"use client"
import apiClient from "@/components/ApiClient";
import cookie from 'js-cookie';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import FarmerLayout from "../FarmerLayout";

const page = () => {

  const [workData, setWorkData] = useState({
    jobTitle: "",
    jobDescription: "",
    totalWorkersRequired: "",
    totalDays: "",
    payPerHour: "",
    type: "farmer"
  });

  const router = useRouter();

  const [posts, setPosts] = useState([]);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setWorkData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try { 
      const user = JSON.parse(window.localStorage.getItem("user"));
      console.log(user._id);

      const data = { farmer: user._id, workData };
      const res = await apiClient.post('/api/farmer', data);

      console.log(res.data);
      if (res.status !== 200) throw new Error("Error while registering");

      window.alert("Post successfully");
      setWorkData({
        jobTitle: "",
        jobDescription: "",
        totalWorkersRequired: "",
        totalDays: "",
        payPerHour: "",
        type: "farmer"
      });
    } catch (error) {
      console.error("Error:", error);
      window.alert("Server error");
    }
  }


  const fetchData = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      // console.log(user);

      const res = await apiClient.get(`/api/farmer?farmerId=${user._id}`);

      if(res.status === 401){
        window.localStorage.removeItem("user");
        router.push("/login");
      }
      if (res.status !== 200) throw new Error("Server error");

      const data = await res.data;
      console.log(data.data);
       // Check if component is still mounted before setting state
      setPosts(data.data);
      
    } catch (error) {
      const accessToken =  cookie.get('accessToken')
      if(error.response.status === 401 && !accessToken) {
        window.localStorage.removeItem("user");
        router.push("/login");
      }
      window.alert("Error fetching data");
    }
  }
  useEffect(() => {

    fetchData();
  }, []); // Empty dependency array to run only once



  return (
    <FarmerLayout>
      <div className="h-[70vh] mt-[3rem] bg-white">
        <div className="h-[100%] flex items-center justify-center bg-green-950/10">
          <form method="POST" onSubmit={handleSubmitForm} className="h-[27rem] w-[50rem] flex flex-col items-center justify-center">
            <p className="text-xl font-semibold">Post New Work</p>
            <div className="flex flex-col gap-1 mt-2 w-[60%]">
              <label htmlFor="">Title</label>
              <input type="text" onChange={handleOnChangeInput} value={workData.jobTitle} name="jobTitle" className="h-[2.5rem] bg-white border-2 border-black rounded-md px-2 text-md" />
            </div>
            <div className="flex flex-col gap-1 mt-2 w-[60%]">
              <label htmlFor="">Job Description</label>
              <textarea name="jobDescription" onChange={handleOnChangeInput} value={workData.jobDescription} className="h-[5rem] bg-white py-1 border-2 border-black rounded-md px-2 text-md" />
            </div>
            <div className="flex gap-2 w-[60%]">
              <div className="flex flex-col gap-1 mt-2 w-[40%]">
                <label htmlFor="">No. Required Labours</label>
                <input type="number" onChange={handleOnChangeInput} value={workData.totalWorkersRequired} name="totalWorkersRequired" className="h-[2.5rem] bg-white border-2 border-black rounded-md px-2 text-md" />
              </div>
              <div className="flex flex-col gap-1 mt-2  w-[24%]">
                <label htmlFor="">Total Days</label>
                <input type="number" onChange={handleOnChangeInput} value={workData.totalDays} name="totalDays" className="h-[2.5rem] bg-white border-2 border-black rounded-md px-2 text-md" />
              </div>
              <div className="flex flex-col gap-1 mt-2  w-[33%]">
                <label htmlFor="">Pay</label>
                <div className="relative h-[2.5rem] border-2 border-black rounded-md text-md bg-white flex px-1 gap-1 items-center">
                  <LiaRupeeSignSolid size={20} color="#00000" className="text-black" />
                  <input type="number" onChange={handleOnChangeInput} value={workData.payPerHour} name="payPerHour" className="h-full bg-white outline-0 w-[80%]" />
                  <p>/hr</p>
                </div>
              </div>
            </div>
            <button type="submit" className="w-[60%] p-2 mt-3 bg-[#32a84b] font-semibold rounded-md text-white">Post</button>
          </form>
        </div>
      </div>
      <div className="mx-14 pb-8">
        <p className="text-xl font-semibold mt-2">Your past works</p>
        <div className="flex flex-col items-center mt-5 gap-5">
          {
            posts.map((item, ind) => (
              <div key={ind} className="h-auto w-[90%] bg-white p-6 flex gap-4 rounded-md drop-shadow-md hover:drop-shadow-lg border">
                <div className="w-[70%]">
                  <p className="text-lg font-semibold mb-2">{item.jobTitle}</p>
                  <p>Description: {item.jobDescription}</p>
                </div>
                <div className="w-[30%] flex flex-col justify-center">
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
              </div>
            ))
          }
        </div>
      </div>
    </FarmerLayout>
  )
}

export default page
