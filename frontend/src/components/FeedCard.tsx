import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";


export default function FeedCard() {
  return (
    <div className="grid grid-cols-12 mt-2 px-4 border-b border-slate-900 ">
      <div className="col-span-1 ">
           <div className="rounded-full text-4xl"> <FaRegCircleUser />
           </div>
      </div>
      <div className="col-span-11 ml-2 cursor-pointer ">
        <div className="flex items-center gap-2">
          <div className="hover:underline font-semibold w-fit">
            shahzaib haider
          </div>
          <div className="text-sm text-[#5D6165]">
            @shahza
          </div>
        </div>
        <div> asdasdasdasdasdasdasdasdasdsa</div>
        {/* <div>
          {tweet.imageURL && (
            <Image
              src={tweet.imageURL}
              alt="tweet-image"
              width={300}
              height={300}
            />
          )}
        </div> */}
        <div className="flex justify-between pr-20">
          <div className="text-xl text-slate-500 hover:text-[#1d9bf0] hover:bg-[#0a171f] rounded-full p-2 transition-all">
            <FaRegComment />
          </div>
          <div className="text-2xl  hover:text-[#029262] text-slate-500 hover:bg-[#071A14] rounded-full p-2 transition-all">
            <BiRepost />
          </div>
          <div className="text-xl  text-slate-500 hover:text-[#f91880] hover:bg-[#200914] rounded-full p-2 transition-all">
            <FaRegHeart />
          </div>
        </div>
      </div>
    </div>
  );
}
