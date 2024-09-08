import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen w-screen bg-white text-black">
        <div className="fixed top-0 h-[3.8rem] w-full bg-white px-12 flex items-center">
          <h1 className="text-xl font-bold">Easy<span className="text-green-600">Farm</span></h1>
        </div>
        <div className="px-12 min-h-[90vh] w-full bg- flex flex-col items-center justify-center bg-gradient-to-b from-[#16513F] to-[#5D9C59]
       text-white">
          <p className="w-[50%] text-center mb-4 text-4xl">Empowering Farmers and Workers: Connecting Talent with Opportunities in Agriculture.</p>
          <div className="flex gap-3">
            <Link href="/register" className="rounded-xl px-5 py-1 bg-[#32a84b] text-white border-2  border-[#32a84b] hover:bg-transparent transition">Register</Link>
            <Link href="/login" className="rounded-xl px-5 py-1 border-2  border-[#32a84b] hover:bg-[#32a84b] transition text-white">Login</Link>
          </div>
        </div>
        {/* <div className="h-screen w-full px-12 flex flex-col items-center">
          <p className="text-xl font-bold mt-24">Features</p>
          <div className="w-full flex justify-center mt-24 gap-8">
            <div className="h-[25rem] w-[20rem] bg-white drop-shadow-lg">
              <div className="h-auto overflow-hidden">
                <img src="/assets/background.jpg" alt="" className="hover:scale-110 transition" />
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold">Find labours</p>
                <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, maxime!</p>
                <button className="rounded-xl px-5 py-1 bg-[#32a84b] text-white border-2  border-[#32a84b] hover:bg-transparent transition hover:text-black">More</button>
              </div>
            </div>
            <div className="h-[25rem] w-[20rem] bg-white drop-shadow-lg">
              <div className="h-auto overflow-hidden">
                <img src="/assets/background.jpg" alt="" className="hover:scale-110 transition" />
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold">Connecting Farmer to Vet</p>
                <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, maxime!</p>
                <button className="rounded-xl px-5 py-1 bg-[#32a84b] text-white border-2  border-[#32a84b] hover:bg-transparent transition hover:text-black">More</button>
              </div>
            </div>
            <div className="h-[25rem] w-[20rem] bg-white drop-shadow-lg">
              <div className="h-auto overflow-hidden">
                <img src="/assets/background.jpg" alt="" className="hover:scale-110 transition" />
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold">Easy Management</p>
                <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, maxime!</p>
                <button className="rounded-xl px-5 py-1 bg-[#32a84b] text-white border-2  border-[#32a84b] hover:bg-transparent transition hover:text-black">More</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
