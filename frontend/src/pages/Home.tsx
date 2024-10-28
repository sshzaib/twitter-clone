import { useGetAllTweets } from "../hooks/tweet"
import { PostTweet } from "../components/PostTweet"
import { FeedCard } from "../components/FeedCard"
import { useGetCurrentUser } from "../hooks/user"

export const Home = () => {
    const {tweets} = useGetAllTweets()
    const {data} = useGetCurrentUser()
    return <>
        <PostTweet />
        {/* @ts-ignore */}
        {tweets ? tweets.map(tweet => <FeedCard key = {tweet?.id} tweet={tweet} userId = {data?.id} />) : null}
    </>
  }