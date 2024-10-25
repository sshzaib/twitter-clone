import { FaArrowLeft, FaRegCircleUser } from "react-icons/fa6"
import { useGetUserById } from "./hooks/user"
import { FeedCard } from "./components/FeedCard"

export const UserProfile = () => {
    const {data} = useGetUserById("9b14050b-8cd2-4c5d-99fb-72cf33d5e93b")
    return (
        <>
      <div className="grid grid-cols-12 cursor-pointer">
        <div className="col-span-1 flex items-center justify-center pl-4">
          <div className="hover:bg-[#181919] p-2 rounded-full">
            <FaArrowLeft />
          </div>
        </div>
        <div className="col-span-11">
          <div className="font-bold ml-6 mt-1">
            {data?.getUserById?.firstName}{" "}
            {data?.getUserById?.lastName}
          </div>
          <div className="ml-6 text-sm text-[#6E7378]">
            {data?.getUserById?.tweets?.length} posts
          </div>
        </div>
      </div>
      <div className="w-full bg-[#333639] h-48 relative">
          <div className="absolute top-28 left-4">
            <FaRegCircleUser className="text-9xl"/>
          </div>
      </div>
      <div className="w-full h-56 border-b border-[#2F3336] pl-4">
        <div className="pt-20 font-bold text-3xl flex">
          {data?.getUserById?.firstName}
          {"  "}
          {data?.getUserById?.lastName}
        </div>
        {/* <div className="text-sm text-[#696e72]">
          @{user.getUserByUsername?.username}
        </div> */}
      </div>
      {data?.getUserById?.tweets && (
        <div>
          {data.getUserById.tweets.map((tweet) => (
            // @ts-ignore
            <FeedCard tweet={tweet} key={tweet?.id} />
          ))}
        </div>
      )}
        </>
    )
}