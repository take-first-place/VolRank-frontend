import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import UserLoginPage from "./pages/UserLoginPage";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;