import { Layout } from "./components/Layout"
import FeedCard from "./components/FeedCard"
import { gqlClient } from "./clients/graphqlClient"
import { VerifyLoginUser } from "./graphql/query/user"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react"
import { FaGlobeAsia } from "react-icons/fa"
import { FaRegCircleUser } from "react-icons/fa6"
import PostTweet from "./components/PostTweet"

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
    <FeedCard />
  </>
}
export default App
