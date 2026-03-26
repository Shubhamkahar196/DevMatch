import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/Body"; 
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Body />}>
         
          <Route path="login" element={<Login />} />
          <Route path="footer" element={<Footer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App