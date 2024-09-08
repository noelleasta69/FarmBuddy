import { LiaRupeeSignSolid } from "react-icons/lia";
import LabourPageLayout from "../LabourPageLayout";

const page = () => {
  return (
    <LabourPageLayout>
        <div className="px-14 pt-[5rem]">
                <p className="text-lg font-semibold">Past works</p>
                <div className="flex flex-col items-center mt-5 gap-5">
                    {
                        [...Array(3)].map((_, ind) => (
                            <div key={ind} className="relative h-auto w-[90%] bg-white p-6 flex gap-4 rounded-md drop-shadow-md hover:drop-shadow-xl border overflow-hidden">
                                <p className="absolute right-0 top-0 p-2 px-3 bg-red-600 text-white"> 12 June 2023</p>
                                <div className="w-[70%]">
                                    <p className="text-lg font-semibold mb-2">Hiring for Labour</p>
                                    <p><span className="font-semibold">Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, officiis. Veniam sit non iste cumque sint quas facilis maiores voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, omnis.</p>
                                    <p><span className="font-semibold">Address:</span> Lorem ipsum dolor sit amet consectetur adipisicing eiciis. Veniam sit non iste .</p>
                                </div>
                                <div className="w-[30%] flex flex-col justify-center">
                                    <p><span className="font-semibold">Number of labours:</span> 10</p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Pay per hour:</span>
                                        <div className="flex items-center">
                                            <LiaRupeeSignSolid size={20} color="#00000" className="text-black" />
                                            1,000
                                        </div>
                                    </div>
                                    <p><span className="font-semibold">Number of days: </span> 4</p>
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
