import React from "react";

import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Body from "./Components/Body";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
