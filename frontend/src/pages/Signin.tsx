import { FaXTwitter } from "react-icons/fa6";
import { Auth } from "./Auth";
import { gqlClient } from "../clients/graphqlClient";
import { LoginUser } from "../graphql/query/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSignin = async () => {
      const user = await gqlClient.request(LoginUser, {loginCred: {email, password}})
      if (user.LoginUser) {
        localStorage.setItem("__twitter_token", `Bearer ${user.LoginUser}`)
        gqlClient.setHeader("Authorization", localStorage.getItem("__twitter_token") as string)
        navigate("/")
      }
    }
  return (
    <div>
      <div className="relative">
        <div className="absolute bg-[#242D34] h-screen w-screen opacity-70"></div>
        <div className="absolute inset-y-9 bg-[#000000] flex justify-center rounded-xl inset-x-[470px]">
          <div className="mt-2 relative">
            <div className="flex justify-center ">
              <FaXTwitter className="text-3xl" />
            </div>
            <div className="mt-8 text-3xl font-semibold">
              Sign in to X
            </div>
            <div className="mt-8">
              <input
                className="block w-80 pt-3 pb-3 bg-transparent ps-2 text-md text-white border border-[#6D7277] rounded-lg"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <input
                className="block w-80 pt-3 pb-3 bg-transparent ps-2 text-md text-white border border-[#6D7277] rounded-lg"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <div className="mt-10 w-full ">
              <button className="border w-full rounded-full p-4 border-slate-600 hover:bg-[#181919]" onClick={handleSignin}>
                Signin
              </button>
            </div>
          </div>
        </div>
        <Auth />
      </div>
    </div>
  );
}
