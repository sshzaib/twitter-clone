import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FC } from 'react';
import { Link } from "react-router-dom";
import { gqlClient } from "../clients/graphqlClient";
import { LikeTweet, UnlikeTweet } from "../graphql/mutation/tweet";
import { queryClient } from "../main";

export interface FeedCardProps {
  tweet: {
    id: string
    content: string
    author: {
      firstName: string
      lastName: string
      id: string
    },
    likedBy: {
      id: string
    }[]
  },
  userId: string
}

export const FeedCard:FC<FeedCardProps> = ({tweet, userId}) => {
  const handleLikeTweet = async () => {
    if (tweet.likedBy.some(el => el.id === userId)) {
      await gqlClient.request(UnlikeTweet, {tweetId: tweet.id})
    } else {
      await gqlClient.request(LikeTweet, {tweetId: tweet.id})
    }
    await queryClient.invalidateQueries({ queryKey: ['getAllTweets'] })
  }
  return (
    <div className="grid grid-cols-12 mt-2 px-4 border-b border-slate-900 ">
      <div className="col-span-1 ">
           <div className="rounded-full text-4xl"> <FaRegCircleUser />
           </div>
      </div>
      <div className="col-span-11 ml-2 cursor-pointer ">
        <div className="flex items-center gap-2">
          <Link to={`/${tweet.author.id}`} className="hover:underline font-semibold w-fit">
            {tweet.author?.firstName} {tweet.author?.lastName}
          </Link>
        </div>
        <div> {tweet.content}</div>
        <div className="flex justify-between pr-20">
          <div className="text-xl text-slate-500 hover:text-[#1d9bf0] hover:bg-[#0a171f] rounded-full p-2 transition-all">
            <FaRegComment />
          </div>
          <div className="text-2xl  hover:text-[#029262] text-slate-500 hover:bg-[#071A14] rounded-full p-2 transition-all">
            <BiRepost />
          </div>
          <button className={`text-xl text-slate-500 ${tweet.likedBy.some(item => item.id === userId) ? "text-[#f91880]" : ""}  hover:bg-[#200914] rounded-full p-2 transition-all`}
          onClick={handleLikeTweet}
          >
            <FaRegHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
