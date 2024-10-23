import { Layout } from "./components/Layout"
import { FeedCard } from "./components/FeedCard"
import { gqlClient } from "./clients/graphqlClient"
import { VerifyLoginUser } from "./graphql/query/user"
import {QueryClient} from "@tanstack/react-query"

import PostTweet from "./components/PostTweet"
import { useGetAllTweets } from "./hooks/tweet"

const queryClient = new QueryClient()

function App() {
  

  return (
    <>
        <Layout>
          <Feed />
        </Layout>
       
    </>
  )
}

const Feed = () => {
  const {tweets} = useGetAllTweets()
  console.log(tweets)
  async function verifyUSer () {
    const {verifyLoginUser} = await gqlClient.request(VerifyLoginUser, {loginCred: {email: "passive@gmail.com", password: "123"}})
    if (verifyLoginUser) {
      localStorage.setItem("__twitter_token", verifyLoginUser)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    }
  }
  verifyUSer()

  return <>
    <PostTweet />
    {/* @ts-ignore */}
    {tweets ? tweets.map(tweet => <FeedCard key = {tweet?.id} tweet={tweet}/>) : null}
  </>
}
export default App
