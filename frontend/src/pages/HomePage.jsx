import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#141E30] via-[#243B55] to-[#1a2b4c] text-white">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
          MyAttendance
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Track your attendance easily — mark your presence daily, view your
          progress, and stay consistent. No teachers, no paper — it’s all you!
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/login"
            className="btn border-none bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 shadow-md w-32"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn border border-blue-400 hover:bg-gradient-to-r from-blue-500 to-purple-600 hover:border-none text-white w-32 shadow-md"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="mt-16">
        <div className="mockup-window border border-gray-600 bg-base-100/10 backdrop-blur-sm p-6 w-full max-w-lg shadow-2xl text-white rounded-xl">
          <div className="text-left">
            <h2 className="text-xl font-semibold text-blue-300 mb-3">
              Daily Attendance Snapshot
            </h2>
            <table className="table text-gray-200">
              <thead className="text-blue-400">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025-10-25</td>
                  <td className="text-success font-medium">Present</td>
                </tr>
                <tr>
                  <td>2025-10-26</td>
                  <td className="text-error font-medium">Absent</td>
                </tr>
                <tr>
                  <td>2025-10-27</td>
                  <td className="text-success font-medium">Present</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400">
        © {new Date().getFullYear()} MyAttendance · Built for Students by Students
      </footer>
    </div>
  );
};

export default HomePage;
