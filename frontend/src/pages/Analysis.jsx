import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Analysis = () => {
  const [subjects, setSubjects] = useState([]);
  const [overallPercentage, setOverallPercentage] = useState(0);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/subject/allsubjects/${storedUser.email}`);

      if (response.data && response.data.subjects) {
        const fetchedSubjects = response.data.subjects;
        setSubjects(fetchedSubjects);
        calculateOverall(fetchedSubjects);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to fetch subjects");
    }
  };

  const calculateOverall = (data) => {
    let totalClasses = 0;
    let totalAttended = 0;
    data.forEach((sub) => {
      totalClasses += sub.totalClass;
      totalAttended += sub.attended;
    });
    const percent = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(2) : 0;
    setOverallPercentage(percent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b0d] to-[#111114] text-gray-100">
      {/* Navbar */}
      <div className="navbar bg-[#0f0f11]/80 backdrop-blur-md border-b border-gray-800 px-10 shadow-lg">
        <div className="flex-1">
          <a className="text-2xl font-extrabold bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent cursor-pointer">
            🎓 Self Attendance
          </a>
          <Link to="/prediction" className="btn btn-sm btn-outline">
            📅 Predict Future Attendance
          </Link>

        </div>
        <div className="flex-none">
          <Link to="/dashboard" className="btn btn-sm btn-outline border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
            ← Back
          </Link>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent">
        Attendance Analysis 📊
      </h1>

      {/* Overall Card */}
      <div className="max-w-xl mx-auto p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/40 to-black shadow-2xl backdrop-blur-xl mb-10">
        <div className="bg-[#0c0c0e]/70 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-200">Overall Attendance</h2>
          <p
            className={`text-5xl font-extrabold mt-4 ${overallPercentage < 75 ? "text-red-500" : "text-green-400"
              }`}
          >
            {overallPercentage}%
          </p>
          <p className="mt-2 text-gray-500">
            {overallPercentage < 75
              ? "⚠️ You need to improve your attendance!"
              : "✅ Great! Keep it up!"}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl bg-[#0c0c0e]/50 border border-gray-800 backdrop-blur-xl shadow-xl">
        <table className="table w-full text-gray-300">
          <thead>
            <tr className="bg-[#151517]/90 text-gray-200 text-sm uppercase tracking-wide">
              <th className="py-3 px-4 text-left">SL No</th>
              <th className="py-3 px-4 text-left">Subject Name</th>
              <th className="py-3 px-4 text-left">Total Classes</th>
              <th className="py-3 px-4 text-left">Attended</th>
              <th className="py-3 px-4 text-left">Percentage</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((sub, index) => {
                const percent =
                  sub.totalClass > 0
                    ? ((sub.attended / sub.totalClass) * 100).toFixed(2)
                    : 0;
                const status = percent >= 75 ? "Good" : "Low";
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-800/40 transition duration-200"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-100">
                      {sub.subjectname}
                    </td>
                    <td className="py-3 px-4">{sub.totalClass}</td>
                    <td className="py-3 px-4">{sub.attended}</td>
                    <td
                      className={`py-3 px-4 font-bold ${percent < 75 ? "text-red-400" : "text-green-400"
                        }`}
                    >
                      {percent}%
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`badge ${status === "Good"
                            ? "badge-success text-green-400 bg-green-900/30"
                            : "badge-error text-red-400 bg-red-900/30"
                          } border-none px-3 py-1`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">
                  No subjects found. Please add subjects first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="footer footer-center text-gray-500 mt-20 p-6 border-t border-gray-800">
        <aside>
          <p>© 2025 Self Attendance System | Designed by Deepak</p>
        </aside>
      </footer>
    </div>
  );
};

export default Analysis;
