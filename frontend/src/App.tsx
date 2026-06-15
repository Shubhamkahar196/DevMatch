// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Body from "./components/Body";
// import Login from "./components/Login";
// import Footer from "./components/Footer";
// import { Provider } from "react-redux";
// import store from "./utils/Store";
// import Feed from "./components/Feed";
// import Profile from "./components/Profile";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";

// function App() {
//   return (
//     <Provider store={store}>
//       <Router basename="/">
//         <Routes>
//           <Route path="/" element={<Body />}>
//             <Route path="/" element={<Feed />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/connections" element={<Connections />} />
//             <Route path="/requests" element={<Requests />} />
//             <Route path="/footer" element={<Footer />} />
//           </Route>
//         </Routes>
//       </Router>
//     </Provider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./utils/Store";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import Premium from "./components/Premium";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="footer" element={<Footer />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="premium" element={<Premium/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;