import { Outlet, useNavigate } from "react-router-dom";

import { BsPerson } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useGetCurrentUser } from "../hooks/user";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

export const Layout: React.FC = () => {
  const {data, isLoading } = useGetCurrentUser()
  const navigate = useNavigate();
  if (!isLoading && !data) {
    navigate("/auth");
  }

  if (isLoading) {
      return <>
        <div className="flex items-center justify-center h-screen">
          <FaXTwitter className="text-6xl" />
        </div>
      </>
  }
   if (!isLoading && data) {
    return (
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3 h-screen sticky top-0 flex justify-end pr-10">
           {/* @ts-ignore */}
        <Sidebar user = {data}/>
        </div>
        <div className="col-span-9 h-screen overflow-y-auto">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-6 border-x border-slate-600"><Outlet /></div>
            <div className="col-span-6">
              <PeopleRecommendation />
            </div>
          </div>
        </div>
      </div>
    );
  } 
};


interface User {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
}
const Sidebar: React.FC<{user: User}> = ({user}) => {
  const navigate = useNavigate()

  const navbarList = [
    {
      title: "Home",
      icon: <GoHomeFill />,
      navigate: "/",
    },
    {
      title: "Explore",
      icon: <IoSearch />,
      navigate: "/",
    },
    {
      title: "Notifications",
      icon: <IoNotificationsOutline />,
      navigate: "/",
    },
    {
      title: "Messages",
      icon: <FaRegEnvelope />,
      navigate: "/",
    },
    {
      title: "Profile",
      icon: <BsPerson />,
      navigate: `/${user.id}`,
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("__twitter_token")
    window.location.reload();
  }
  
  return (
    <div>
      <div className="cursor-pointer hover:bg-slate-900 w-fit rounded-full p-3 transition-all">
        <FaXTwitter className="text-3xl" />
      </div>
      <ul>
        {navbarList.map((item) => (
          <li
            key={item.title}
            className="cursor-pointer flex items-center gap-4 text-xl justify-center hover:bg-slate-900 w-fit rounded-full transition-all p-3 pr-5 "
          >
            <button
              className="flex gap-2"
              onClick={()=> navigate(item.navigate)}
            >
              <span className="text-3xl">{item.icon}</span>
              <span>{item.title}</span>
            </button>
          </li>
        ))}
        <li
            className="cursor-pointer flex items-center gap-4 text-xl justify-center hover:bg-slate-900 w-fit rounded-full transition-all p-3 pr-5 "
          >
            <button
              className="flex gap-2"
              onClick={handleLogout}
            >
              <span className="text-3xl"><BiLogOut /></span>
              <span>Logout</span>
            </button>
          </li>
      </ul>
      <div className="mt-4 ">
        <button className="bg-[#1d9bf0] rounded-full w-full py-3.5 font-bold">
          Post
        </button>
      </div>
      <div className="absolute bottom-5 flex items-center gap-4 hover:bg-[#181818] cursor-pointer rounded-full p-3">
        <div className="text-3xl">
          <FaRegCircleUser />
        </div>
        <div className="flex flex-col ">
          <div className="font-medium flex text-sm">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div>
           <BsThreeDots /> 
        </div>
      </div>
    </div>
  );
};

function PeopleRecommendation() {
  const [search, setSearch] = useState("");
  
  return (
    <div className="ml-8 flex flex-col w-[23rem] mt-1">
      <div className="bg-[#202327] w-full p-3 focus:outline-red-200 flex items-center gap-4 rounded-full ">
        <IoSearch className="text-slate-500 text-xl" />
        <input
          type="text"
          value={search}
          className="bg-[#202327] w-full focus:outline-none "
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}


