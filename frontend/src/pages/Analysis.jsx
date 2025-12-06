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
    <div
      className="min-h-screen text-[#e7ecef]"
      style={{ backgroundColor: "#274c77" }}
    >
      {/* Navbar */}
      <div
        className="flex justify-between items-center px-6 py-4 border-b"
        style={{ borderColor: "#e7ecef" }}
      >
        <h1 className="text-2xl font-extrabold">
          Attendance Analysis
        </h1>

        <div className="flex gap-3">
          <Link
            to="/prediction"
            className="px-4 py-2 text-sm border rounded-md transition duration-200"
            style={{
              borderColor: "#e7ecef",
              color: "#e7ecef",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e7ecef";
              e.target.style.color = "#274c77";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#e7ecef";
            }}
          >
            Predict Attendance
          </Link>

          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm border rounded-md transition duration-200"
            style={{
              borderColor: "#e7ecef",
              color: "#e7ecef",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e7ecef";
              e.target.style.color = "#274c77";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#e7ecef";
            }}
          >
            Back
          </Link>
        </div>
      </div>

      {/* Overall Card */}
      <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg text-center"
        style={{
          backgroundColor: "#e7ecef",
          color: "#274c77",
          border: "1.5px solid #e7ecef",
        }}
      >
        <h2 className="text-xl font-semibold">Overall Attendance</h2>

        <p
          className="text-5xl font-extrabold mt-4"
          style={{
            color: overallPercentage < 75 ? "#a11a1a" : "#274c77",
          }}
        >
          {overallPercentage}%
        </p>

        <p
          className="mt-2 text-sm"
          style={{
            color: overallPercentage < 75 ? "#a11a1a" : "#274c77",
          }}
        >
          {overallPercentage < 75 ? (
            <>
              <i className="bi bi-exclamation-triangle"></i> Needs Improvement
            </>
          ) : (
            <>
              <i className="bi bi-check-circle" style={{color:"green"}}></i> Great Consistency
            </>
          )}

        </p>
      </div>

      {/* Table */}
      <div
        className="max-w-6xl mx-auto mt-12 overflow-x-auto rounded-xl shadow-lg"
        style={{
          border: "1.5px solid #e7ecef",
        }}
      >
        <table className="w-full text-sm md:text-base">
          <thead style={{ backgroundColor: "#e7ecef", color: "#274c77" }}>
            <tr>
              <th className="py-3 px-4">SL No</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Total Classes</th>
              <th className="py-3 px-4">Attended</th>
              <th className="py-3 px-4">%</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {subjects.length > 0 ? (
              subjects.map((sub, index) => {
                const percent =
                  sub.totalClass > 0
                    ? ((sub.attended / sub.totalClass) * 100).toFixed(2)
                    : 0;
                return (
                  <tr
                    key={index}
                    className="transition duration-200 hover:opacity-80"
                    style={{
                      borderBottom: "1px solid #e7ecef",
                    }}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{sub.subjectname}</td>
                    <td className="py-3 px-4">{sub.totalClass}</td>
                    <td className="py-3 px-4">{sub.attended}</td>
                    <td
                      className="py-3 px-4 font-bold"
                      style={{ color: percent < 75 ? "#a11a1a" : "#e7ecef" }}
                    >
                      {percent}%
                    </td>
                    <td className="py-3 px-4">
                      {percent < 75 ? "Low" : "Good"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 opacity-70">
                  No subjects added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer
        className="text-center text-sm mt-14 mb-6 opacity-80"
      >
        © {new Date().getFullYear()} Self Attendance · Designed by Deepak
      </footer>
    </div>
  );
};

export default Analysis;
