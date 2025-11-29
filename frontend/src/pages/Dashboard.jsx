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
    {
      title: "📘 Subjects",
      desc: "Manage and add your subjects here",
      route: "/allsubjects",
    },
    {
      title: "📅 Attendance",
      desc: "Mark and track your daily attendance",
      route: "/attendance",
    },
    {
      title: "📊 Analysis",
      desc: "Visualize your subject performance",
      route: "/analysis",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-100 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#0f0f0f]/70 backdrop-blur-md border-b border-gray-800 px-8 shadow-[0_0_15px_rgba(0,0,0,0.6)]">
        <div className="flex-1">
          <span className="text-2xl font-semibold tracking-wide text-white">
            🌌 Vibrant Academic Dashboard
          </span>
        </div>
        <div className="flex-none">
          <span className="mr-4 text-sm text-gray-400">
            Welcome, {user?.email}
          </span>
          <button
            onClick={handlelogout}
            className="btn btn-sm bg-[#1a1a1a] border border-gray-700 hover:bg-red-600 hover:border-red-600 text-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col justify-center items-center flex-1 text-center p-10">
        <h1 className="text-3xl font-bold mb-10 text-white tracking-tight">
          Student Dashboard
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => card.route !== "#" && Navigate(card.route)}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-[#1a1a1a]/70 to-[#0f0f0f]/90 shadow-[0_0_25px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_-10px_rgba(120,120,255,0.3)] backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>

              {/* Card Content */}
              <div className="relative z-10 p-6 flex flex-col justify-between h-full text-left">
                <h2 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-white">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Subtle Glow Border on Hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-indigo-400/30 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center bg-[#0f0f0f]/70 backdrop-blur-sm border-t border-gray-800 text-gray-500 p-4">
        <aside>
          <p className="text-sm">
            © 2025 Self Attendance System | Designed with ❤️ by Deepak
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Dashboard;
