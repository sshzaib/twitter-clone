import { FaArrowLeft, FaRegCircleUser, FaRegComment, FaRegHeart } from "react-icons/fa6"
import { useGetCurrentUser, useGetUserById } from "../hooks/user"
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import { gqlClient } from "../clients/graphqlClient";
import { LikeTweet, UnlikeTweet } from "../graphql/mutation/tweet";
import { queryClient } from "../main";
import { BiRepost } from "react-icons/bi";
import { FollowUser, UnfollowUser } from "../graphql/mutation/user";

export const UserProfile:React.FC = () => {
    const { userId } = useParams();
    const {data} = useGetUserById(userId as string)
    const user = useGetCurrentUser()
    const navigate = useNavigate()
    
    const handleFollow = async () => {  
      if (data?.getUserById?.followers?.some(el => el?.id === user.data?.id)) {
        await gqlClient.request(UnfollowUser, {followingId: userId})
      } else {
        await gqlClient.request(FollowUser, {followingId: userId})
      }
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      await queryClient.invalidateQueries({ queryKey: ['recommendedPeople'] })
    }

    return (
        <>
      <div className="grid grid-cols-12 cursor-pointer">
        <div className="col-span-1 flex items-center justify-center pl-4">
          <div className="hover:bg-[#181919] p-3 rounded-full">
            <button onClick={() => navigate("/")}>
              <FaArrowLeft />
            </button>
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
        <div className="flex justify-end pt-2">
          <button className="bg-white rounded-full text-black p-2 mr-2 px-4 hover:bg-slate-300"
            onClick={handleFollow}
          >
            {data?.getUserById?.followers?.some(el => el?.id === user.data?.id) ? "UnFollow" : "Follow"}
          </button>
        </div>
        <div className="pt-20 font-bold text-3xl flex">
          {data?.getUserById?.firstName}
          {"  "}
          {data?.getUserById?.lastName}
        </div>
        <div className="flex mt-4">
          <div className="mr-4">
            {data?.getUserById?.followings?.length} Followings  
          </div>
          <div>
            {data?.getUserById?.followers?.length} Followers
          </div>
        </div>
      </div>
      {data?.getUserById?.tweets && (
        <div>
          {data.getUserById.tweets.map((tweet) => (
            // @ts-ignore
            <FeedCard key={tweet?.id} tweet={tweet} userId = {user.data?.id} />
          ))}
        </div>
      )}
        </>
    )
}

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

export const FeedCard:React.FC<FeedCardProps> = ({tweet, userId}) => {
  const handleLikeTweet = async () => {
    if (tweet.likedBy.some(el => el.id === userId)) {
      await gqlClient.request(UnlikeTweet, {tweetId: tweet.id})
    } else {
      await gqlClient.request(LikeTweet, {tweetId: tweet.id})
    }
    await queryClient.invalidateQueries({ queryKey: ['user'] })
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
