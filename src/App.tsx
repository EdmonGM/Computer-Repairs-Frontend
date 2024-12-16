import "./App.css";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import useStore from "./app/store";

function App() {
  let url = useLocation().pathname;
  const decodeToken = useStore((state) => state.decodeToken);
  useEffect(decodeToken, [url]);
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
