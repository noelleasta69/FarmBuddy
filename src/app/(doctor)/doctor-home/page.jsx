'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorPageLayout from "../DoctorPageLayout";

const VetPage = () => {
  const [appointments, setAppointments] = useState([]);
  const vetId = JSON.parse(localStorage.getItem("user"))._id; // Replace with actual vet ID
  // console.log("vet id is : ", vetId);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`/api/vet/appointments?vetId=${vetId}`);
        setAppointments(res.data.pendingAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [vetId]);

  return (
    <DoctorPageLayout>
      <div className="px-12 h-full w-full pt-[3.7rem]">
        <p className="text-lg font-semibold mt-6">Pending Appointments</p>
        <div className="flex flex-col gap-4 items-center mt-4">
          {appointments.length === 0 ? (
            <p>No pending appointments</p>
          ) : (
            appointments.map((appointment, ind) => (
              <div key={ind} className="h-auto w-[90%] bg-white p-6 flex gap-5 rounded-md drop-shadow-md hover:drop-shadow-lg border">
                <div className="flex items-center justify-center w-[10%]">
                  <div className="h-[5.5rem] w-[5.5rem] bg-slate-600 rounded-full"></div>
                </div>
                <div className="w-[20%]">
                  <p className="text-lg font-semibold mb-2">{appointment.farmer.name}</p>
                  <p>Contact: {appointment.farmer.contact}</p>
                </div>
                <div className="w-[40%]">
                  <p>Address:</p>
                  <p>{appointment.farmer.address}</p>
                </div>
                <div className="w-[25%] flex flex-col gap-2 items-end">
                  <button className="rounded-lg w-[9rem] px-5 py-1 bg-[#32a84b] text-white border-2 border-[#32a84b] hover:bg-transparent hover:text-black transition">
                    Video Call
                  </button>
                  <button className="rounded-lg w-[9rem] px-5 py-1 hover:bg-[#32a84b] border-2 border-[#32a84b] text-black hover:text-white transition">
                    Chat
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DoctorPageLayout>
  );
};

export default VetPage;



// ************************************************************ older code ***************************************


// import DoctorPageLayout from "../DoctorPageLayout"

// const page = () => {
//   return (
//     <DoctorPageLayout>
//       <div className="px-12 h-full w-full pt-[3.7rem]">
//         <p className="text-lg font-semibold mt-6">Pending Appointments</p>
//         <div className="flex flex-col gap-4 items-center mt-4">
//           {
//             [...Array(3)].map((_, ind) => (
//               <div key={ind} className="h-auto w-[90%] bg-white p-6 flex gap-5 rounded-md drop-shadow-md hover:drop-shadow-lg border">
//                 <div className="flex items-center justify-center w-[10%]">
//                   <div className="h-[5.5rem] w-[5.5rem] bg-slate-600 rounded-full animate-pulse">

//                   </div>
//                 </div>
//                 <div className="w-[20%]">
//                   <p className="text-lg font-semibold mb-2">Hackeadfadr saheb</p>
//                   <p>Contact: 8792382938</p>
//                   {/* <p></p> */}
//                 </div>
//                 <div className="w-[40%]">
//                   <p>Address:</p>
//                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique alias ea tempora a ab consequatur ipsam non, inventore atque eos.</p>
//                 </div>
//                 <div className="w-[25%] flex flex-col gap-2 items-end">
//                   <button className="rounded-lg w-[9rem] px-5 py-1 bg-[#32a84b] text-white border-2  border-[#32a84b] hover:bg-transparent hover:text-black transition">Video Call</button>
//                   <button className="rounded-lg w-[9rem] px-5 py-1 hover:bg-[#32a84b] border-2  border-[#32a84b] text-black hover:text-white transition">Chat</button>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </DoctorPageLayout>
//   )
// }

// export default page
