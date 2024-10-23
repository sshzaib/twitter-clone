import { Layout } from "./components/Layout"
import FeedCard from "./components/FeedCard"
import { gqlClient } from "./clients/graphqlClient"
import { VerifyLoginUser } from "./graphql/query/user"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Feed />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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
    <FeedCard />
    <FeedCard />
    <FeedCard />
    <FeedCard />
    <FeedCard />

  </>
}
export default App
