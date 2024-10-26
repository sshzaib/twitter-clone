import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Signin } from "./pages/Signin";
import { UserProfile } from "./UserProfile";
import { Signup } from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>

          {/* Routes with layout  */}
          <Route element={<Layout />}>
            <Route path = "/" element={<Home />} />
            <Route path = "/:userId" element = {<UserProfile />} />
          </Route>


          {/* Routes without Layout */}
          <Route path = "/auth" element={<Auth />} />
          <Route path= "/i/flow/signin" element = {<Signin />} />
          <Route path= "/i/flow/signup" element = {<Signup />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
