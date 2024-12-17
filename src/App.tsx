import "./App.css";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import useStore from "./app/store";
import TicketEdit from "./pages/TicketEdit";
import TicketCreate from "./pages/TicketCreate";

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
          <Route path="/tickets">
            <Route path=":id" element={<TicketEdit />} />
            <Route path="new" element={<TicketCreate />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
