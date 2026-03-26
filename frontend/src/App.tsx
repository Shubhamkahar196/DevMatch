import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Body from "./components/Body"

function App() {
  return (
   <>
   <Router basename="/">
    <Routes >
      <Route >
        <Route path="/" element={<Body/>} />
       <Route path="/login" element={<Login/>}/>
       <Route path="/footer" element={<Footer/>}/>
      </Route>
    </Routes>
   </Router>
   </>
  )
}

export default App
