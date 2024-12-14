import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Login />
      </main>
    </>
  );
}

export default App;
