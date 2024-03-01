import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Fragments/Navbar";

function App() {
  return (
    <>
      <Navbar logoName="DaraStore" />
      <main className="max-w-7xl mx-auto"></main>
    </>
  );
}

export default App;
