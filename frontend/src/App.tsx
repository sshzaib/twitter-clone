import { Layout } from "./components/Layout"
import FeedCard from "./components/FeedCard"

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
  return <>
    <FeedCard />
    <FeedCard />
    <FeedCard />
    <FeedCard />
    <FeedCard />

  </>
}
export default App
