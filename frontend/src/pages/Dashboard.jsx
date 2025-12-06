import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      Navigate("/login");
    }
  }, [Navigate]);

  const handlelogout = () => {
    localStorage.removeItem("user");
    Navigate("/login");
  };

  const cards = [
    { title: " Analysis", route: "/analysis", img: "bi bi-graph-up-arrow", desc: "Visual interpretation with depth & clarity" },
    { title: " Subjects", route: "/allsubjects", img: "bi bi-window-stack", desc: "Organize content with structured elegance" },
    { title: " Attendance", route: "/attendance", img: "bi bi-calendar-check", desc: "Track progress in refined minimal style" },
  ];

  return (
    <div className="min-h-screen bg-[#e7ecefff] text-[#274c77ff] flex flex-col font-inter">

      {/* Navbar */}
      <div className="flex flex-wrap gap-4 justify-between items-center px-6 md:px-10 py-4 bg-[#274c77ff] text-[#e7ecefff] border-b border-[#e7ecefff]">
        <h1 className="text-xl md:text-2xl font-semibold">Minimal Dashboard</h1>

        <div className="flex items-center gap-3 text-sm md:text-base">
          <span className="hidden sm:block">Welcome, {user?.email}</span>
          <button
            onClick={handlelogout}
            className="px-3 py-2 md:px-4 md:py-2 border border-[#e7ecefff] rounded-md hover:bg-[#e7ecefff] hover:text-[#274c77ff] transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Hero */}
      {/* Hero Section */}
      <div
        className="text-center py-24 bg-cover bg-center border-b border-[#1e2749]"
        style={{
          // backgroundImage: "url('/hero.jpg')",
          backgroundColor: "#274c77"
        }}
      >
        <h1 className="text-5xl font-bold text-[#e4d9ff] drop-shadow-xl">
          Elegant & Modern UI
        </h1>
        <p className="text-lg text-[#fafaff] mt-4 drop-shadow-md max-w-2xl mx-auto">
          A refined academic dashboard with deep indigo tones and soft pastel accents.
        </p>
      </div>


      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 py-12 md:py-16 px-6 md:px-10 bg-[#274c77]">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => Navigate(card.route)}
            className="cursor-pointer bg-white text-[#274c77ff] p-5 rounded-xl shadow-sm hover:shadow-xl hover:border-[#274c77ff] border border-[#e7ecefff] transition h-44"
          >

            <h3 className="text-lg md:text-xl font-semibold mb-2"><i className={card.img}></i>{card.title}</h3>
            <p className="text-sm md:text-base opacity-80">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-[#274c77ff] border-t border-[#e7ecefff] text-[#e7ecefff] text-xs md:text-sm">
        © 2025 Minimal UI | Designed by Deepak
      </footer>

    </div>
  );
};

export default Dashboard;
