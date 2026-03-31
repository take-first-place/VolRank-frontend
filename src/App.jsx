import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import UserLoginPage from "./pages/UserLoginPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
