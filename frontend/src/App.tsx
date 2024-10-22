import { Layout } from "./components/Layout"
import FeedCard from "./components/FeedCard"
import { gqlClient } from "./clients/graphqlClient"
import { VerifyLoginUser } from "./graphql/query/user"

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
