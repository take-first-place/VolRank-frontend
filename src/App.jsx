import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserLoginPage from "./pages/UserLoginPage";
import RankingPage from "./pages/RankingPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </>
  );
};

export default App;
