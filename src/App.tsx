import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "@/scenes/navbar";
import Login from "./Login";
import { SelectedPage } from "@/shared/types";
import { Routes, Route } from 'react-router-dom';
import Profile from "@/pages/Profile";
import Home from "@/pages/Home";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const { isAuthenticated, isLoading, } = useAuth0();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="https://i.gifer.com/ZZ5H.gif"
          alt="Loading..."
          className="w-12 h-12"
        />
      </div>
    );
  }
  return (
    <div className="app bg-gray-20">
      {isAuthenticated ? (
        <Navbar
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      ) : (
        <Login />
      )}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
