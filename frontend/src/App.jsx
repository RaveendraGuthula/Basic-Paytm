// import "./App";
import{BrowserRouter,Routes,Route} from "react-router-dom"
import { Signup } from "./Pages/signUp"
import { Dashboard } from "./Pages/dashboard"
import { Send } from "./Pages/send"
import { Signin } from "./Pages/signin"

function App() {

  return (
    <div>
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/dashboard"element={<Dashboard/>}></Route>
            <Route path="/send" element={<Send/>}></Route>
          </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
