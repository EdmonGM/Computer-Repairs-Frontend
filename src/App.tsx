import "./App.css";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useStore from "./app/store";
import { useEffect } from "react";

type TokenPayload = {
  id: string;
  username: string;
  email: string;
};

function App() {
  const { setId, setEmail, setUsername } = useStore();

  function decodeToken(): void {
    let token = Cookies.get("access");
    if (token) {
      let { id, username, email }: TokenPayload = jwtDecode(token);
      setId(id);
      setUsername(username);
      setEmail(email);
    }
  }

  useEffect(() => decodeToken(), []);

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
