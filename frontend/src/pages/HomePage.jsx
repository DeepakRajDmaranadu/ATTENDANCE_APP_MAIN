import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center text-center px-6"
      style={{
        backgroundColor: "#274c77",
        color: "#e7ecef",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6 mt-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
          MyAttendance
        </h1>

        <p className="text-base md:text-lg opacity-90 leading-relaxed max-w-xl mx-auto">
          A clean and simple platform to mark attendance, monitor your record,
          and improve consistency daily — built with clarity and focus.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            to="/login"
            className="px-6 py-3 text-lg font-medium rounded-lg border transition duration-300 w-full sm:w-auto"
            style={{
              backgroundColor: "#274c77",
              border: "2px solid #e7ecef",
              color: "#e7ecef",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e7ecef";
              e.target.style.color = "#274c77";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#274c77";
              e.target.style.color = "#e7ecef";
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 text-lg font-medium rounded-lg border transition duration-300 w-full sm:w-auto"
            style={{
              backgroundColor: "#e7ecef",
              color: "#274c77",
              border: "2px solid #e7ecef",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#274c77";
              e.target.style.color = "#e7ecef";
              e.target.style.border = "2px solid #e7ecef";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e7ecef";
              e.target.style.color = "#274c77";
            }}
          >
            Register
          </Link>
        </div>
      </div>

      {/* Attendance Card */}
      <div
        className="mt-16 w-full max-w-md rounded-xl p-6 shadow-lg"
        style={{
          backgroundColor: "#e7ecef",
          color: "#274c77",
          border: "1.5px solid #274c77",
        }}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Recent Attendance Log
        </h2>

        <table className="w-full text-left text-sm md:text-base">
          <thead>
            <tr style={{ borderBottom: "2px solid #274c77" }}>
              <th className="py-2">Date</th>
              <th className="py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "2025-10-25", status: "Present" },
              { date: "2025-10-26", status: "Absent" },
              { date: "2025-10-27", status: "Present" },
            ].map((row, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #274c77" }}>
                <td className="py-2">{row.date}</td>
                <td
                  className="py-2 text-center font-medium"
                  style={{
                    color: row.status === "Present" ? "#274c77" : "#a11a1a",
                  }}
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm opacity-80 mb-6">
        © {new Date().getFullYear()} MyAttendance · Designed for Consistency
      </footer>
    </div>
  );
};

export default HomePage;
