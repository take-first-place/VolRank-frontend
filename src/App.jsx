import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import UserLoginPage from "./pages/UserLoginPage";
import RankingPage from "./pages/RankingPage";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/adminpage";
import Adminroute from "./components/adminroute";

import VolunteerPage from "./pages/VolunteerPage";

const App = () => {
  const isLoggedIn = false;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/ranking" element={<RankingPage isLoggedIn={isLoggedIn} />} />
        <Route path="/volunteers" element={<VolunteerPage isLoggedIn={isLoggedIn} />} />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <UserLoginPage isLoggedIn={isLoggedIn} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Signup isLoggedIn={isLoggedIn} />
            )
          }
        />

        <Route
          path="/mypage"
          element={
            isLoggedIn ? (
              <MyPage isLoggedIn={isLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route element={<Adminroute/>}>
        <Route path ="/admin" element ={<AdminPage/>}/></Route>

      </Routes>
    </>
  );
};

export default App;