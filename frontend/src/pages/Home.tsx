import { useGetAllTweets } from "../hooks/tweet"
import { PostTweet } from "../components/PostTweet"
import { FeedCard } from "../components/FeedCard"
import { useGetCurrentUser } from "../hooks/user"
import { Layout } from "./Layout"


export const Home = () => {
    const {tweets} = useGetAllTweets()
    const {data} = useGetCurrentUser()
    console.log(tweets)
    console.log(data)
    return <>
        <PostTweet />
        {/* @ts-ignore */}
        {tweets ? tweets.map(tweet => <FeedCard key = {tweet?.id} tweet={tweet}/>) : null}
    </>
  }