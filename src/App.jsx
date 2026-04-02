import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import UserLoginPage from "./pages/UserLoginPage";
import MyPage from "./pages/MyPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;