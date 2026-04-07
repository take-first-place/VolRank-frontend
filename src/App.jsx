import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserLoginPage from "./pages/UserLoginPage";
import RankingPage from "./pages/RankingPage";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/adminpage";
import AdminRoute from "./components/adminrouter";


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route element={<AdminRoute/>}>
        <Route path ="/admin" element ={<AdminPage/>}/></Route> 
      </Routes>
    </>
  );
};

export default App;