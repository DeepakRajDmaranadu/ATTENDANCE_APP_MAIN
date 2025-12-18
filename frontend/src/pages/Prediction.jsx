import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Prediction = () => {
  const [subjects, setSubjects] = useState([]);
  const [futureData, setFutureData] = useState({});
  const [overallFuture, setOverallFuture] = useState(0);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/subject/allsubjects/${storedUser.email}`);
      if (response.data && response.data.subjects) {
        const fetched = response.data.subjects;
        setSubjects(fetched);

        const initial = {};
        fetched.forEach(sub => {
          initial[sub.subjectname] = { futureClasses: 0, attendPlan: 0 };
        });
        setFutureData(initial);
      }
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  const handleInput = (sub, key, value) => {
    setFutureData(prev => ({
      ...prev,
      [sub]: { ...prev[sub], [key]: Number(value) }
    }));
  };

  const calculateFuture = () => {
    let totalFutureClasses = 0;
    let totalFutureAttended = 0;

    subjects.forEach(sub => {
      const data = futureData[sub.subjectname];
      totalFutureClasses += (sub.totalClass + data.futureClasses);
      totalFutureAttended += (sub.attended + data.attendPlan);
    });

    const percent = ((totalFutureAttended / totalFutureClasses) * 100).toFixed(2);
    setOverallFuture(percent);
  };

  return (
    <div
      className="min-h-screen text-[#e7ecef]"
      style={{ backgroundColor: "#274c77" }}  // SAME THEME
    >

      {/* Navbar */}
      <div
        className="flex justify-between items-center px-6 py-4 border-b"
        style={{ borderColor: "#e7ecef" }}
      >
        <h1 className="text-2xl font-extrabold">Future Attendance Prediction</h1>

        <Link
          to="/analysis"
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
          ← Back
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mt-8 mb-10">
        Plan & Predict 📊
      </h1>

      <div
        className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg"
        style={{
          border: "1.5px solid #e7ecef",
          backgroundColor: "transparent",
        }}
      >
        <table className="table w-full text-[#e7ecef]">
          <thead style={{ backgroundColor: "#e7ecef", color: "#274c77" }}>
            <tr>
              <th>Subject</th>
              <th>Future Classes</th>
              <th>Will Attend</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((sub, index) => (
              <tr
                key={index}
                className="transition duration-200 hover:opacity-80"
                style={{ borderBottom: "1px solid #e7ecef" }}
              >
                <td className="py-3 px-4">{sub.subjectname}</td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    className="input input-sm"
                    style={{
                      borderColor: "#e7ecef",
                      background: "transparent",
                      color: "#e7ecef",
                    }}
                    onChange={(e) =>
                      handleInput(sub.subjectname, "futureClasses", e.target.value)
                    }
                  />
                </td>

                <td className="py-3 px-4">
                  <input
                    type="number"
                    className="input input-sm"
                    style={{
                      borderColor: "#e7ecef",
                      background: "transparent",
                      color: "#e7ecef",
                    }}
                    onChange={(e) =>
                      handleInput(sub.subjectname, "attendPlan", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Predict Button */}
        <div className="text-center mt-8">
          <button
            className="px-5 py-2 rounded-md border transition duration-200"
            style={{
              borderColor: "#e7ecef",
              backgroundColor: "transparent",
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
            onClick={calculateFuture}
          >
            🔮 Predict Attendance
          </button>
        </div>
      </div>

      {/* Prediction Output */}
      {overallFuture > 0 && (
        <div
          className="max-w-md mx-auto mt-10 p-6 text-center rounded-xl shadow-lg"
          style={{
            backgroundColor: "#e7ecef",
            color: "#274c77",
            border: "1.5px solid #e7ecef",
          }}
        >
          <h2 className="text-xl font-semibold">Future Overall Attendance</h2>

          <p
            className="text-5xl font-extrabold mt-4"
            style={{
              color: overallFuture < 75 ? "#a11a1a" : "#274c77",
            }}
          >
            {overallFuture}%
          </p>

          <p className="mt-2 text-sm">
            {overallFuture < 75 ? (
              <span style={{ color: "#a11a1a" }}>
                <i className="bi bi-exclamation-triangle"></i> Needs Improvement
              </span>
            ) : (
              <span>
                <i className="bi bi-check-circle" style={{ color: "green" }}></i>{" "}
                Great Consistency
              </span>
            )}
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-sm mt-14 mb-6 opacity-80">
        © {new Date().getFullYear()} Self Attendance · Designed by Deepak
      </footer>
    </div>
  );
};

export default Prediction;
