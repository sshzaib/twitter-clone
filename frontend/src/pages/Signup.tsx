import { FaXTwitter } from "react-icons/fa6";
import { Auth } from "./Auth";
import { gqlClient } from "../clients/graphqlClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupUser } from "../graphql/mutation/user";

export const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignup = async () => {
      const user = await gqlClient.request(SignupUser, {user: {email, password, firstName, lastName}})
      if (user.SignupUser) {
        localStorage.setItem("__twitter_token", `Bearer ${user.SignupUser}`)
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
              Sign up to X
            </div>
            <div className="mt-8">
              <input
                className="block w-80 pt-3 pb-3 bg-transparent ps-2 text-md text-white border border-[#6D7277] rounded-lg"
                placeholder="First Name"
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <input
                className="block w-80 pt-3 pb-3 bg-transparent ps-2 text-md text-white border border-[#6D7277] rounded-lg"
                placeholder="Last Name"
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
              />
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
              <button className="border w-full rounded-full p-4 border-slate-600 hover:bg-[#181919]" onClick={handleSignup}>
                Signup
              </button>
            </div>
          </div>
        </div>
        <Auth />
      </div>
    </div>
  );
}
