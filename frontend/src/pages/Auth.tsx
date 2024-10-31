import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate()
  return (
    <div>
      <div className="grid grid-cols-12 h-screen">
        <div className="hidden md:block md:col-span-7 md:flex h-screen items-center justify-center">
          <FaXTwitter className="text-[20rem]" />
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col items-center md:items-start justify-center">
          <div className="text-5xl font-extrabold">Happening now</div>
          <div className="w-80">
            <div className="text-2xl font-bold mt-16">Join today.</div>
            <div className="mt-2">
              <button 
                className="bg-[#1d9bf0] rounded-full w-full p-3"
                onClick={()=> navigate("/i/flow/signup")}>
                Create account
              </button>
            </div>

            <div className="flex items-center mt-1">
               <div className="grid grid-rows-1 w-1/2 border border-[#2F3336]"></div> 
               <div className="mx-2">or</div> 
              <div className="grid grid-rows-1 w-1/2 border border-[#2F3336]"></div>
            </div> 
            
            <div className="font-semibold">Already have an account?</div>
            <div className="cursor-pointer w-full">
              <button className="w-full p-3 text-[#1D9BE9] cursor-pointer hover:bg-[#031018] border border-slate-400 mt-2 rounded-full"
              onClick={()=> navigate("/i/flow/signin")}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
