import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/Body"; 
import Login from "./components/Login";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./utils/Store";
import Feed from "./components/Feed";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        
        <Route path="/" element={<Body />}>
         
          <Route path="login" element={<Login />} />
          <Route path="footer" element={<Footer />} />
          <Route path="feed" element={<Feed/>} />
        </Route>
      </Routes>
    </Router>
    </Provider>
  );
}

export default App