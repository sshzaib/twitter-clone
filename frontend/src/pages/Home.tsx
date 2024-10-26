import { useGetAllTweets } from "../hooks/tweet"
import { PostTweet } from "../components/PostTweet"
import { FeedCard } from "../components/FeedCard"

export const Home = () => {
    const {tweets} = useGetAllTweets()
    return <>
        <PostTweet />
        {/* @ts-ignore */}
        {tweets ? tweets.map(tweet => <FeedCard key = {tweet?.id} tweet={tweet}/>) : null}
    </>
  }