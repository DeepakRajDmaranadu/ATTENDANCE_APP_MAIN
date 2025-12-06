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

        // Initialize inputs
        const initial = {};
        fetched.forEach(sub => {
          initial[sub.subjectname] = { futureClasses: 0, attendPlan: 0 };
        });
        setFutureData(initial);
      }
    } catch (error) {
      console.error(error);
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

    const percent =
      ((totalFutureAttended / totalFutureClasses) * 100).toFixed(2);

    setOverallFuture(percent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b0d] to-[#111114] text-gray-100">

      {/* Navbar */}
      <div className="navbar bg-[#0f0f11]/80 border-b border-gray-800 px-10">
        <div className="flex-1">
          <p className="text-2xl font-extrabold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
            📅 Future Attendance Prediction
          </p>
        </div>
        <div className="flex-none">
          <Link to="/analysis" className="btn btn-sm btn-outline text-gray-300">
            ← Back
          </Link>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center mt-8 mb-10 text-gray-200">
        Plan & Predict 📊
      </h1>

      <div className="max-w-4xl mx-auto bg-[#0d0d0f]/60 p-6 rounded-xl border border-gray-700 backdrop-blur-xl">
        <table className="table w-full text-gray-300">
          <thead>
            <tr className="text-sm uppercase bg-[#151517]/90 text-red-400">
              <th>Subject</th>
              <th>Future Classes</th>
              <th>Will Attend</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, index) => (
              <tr key={index}>
                <td className="py-3 px-4">{sub.subjectname}</td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    className="input input-sm bg-[#1a1a1c]"
                    onChange={(e) =>
                      handleInput(sub.subjectname, "futureClasses", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    className="input input-sm bg-[#1a1a1c]"
                    onChange={(e) =>
                      handleInput(sub.subjectname, "attendPlan", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculate Button */}
        <div className="text-center mt-8">
          <button onClick={calculateFuture} className="btn btn-primary text-white">
            🔮 Predict Attendance
          </button>
        </div>
      </div>

      {/* Output Future Overall */}
      {overallFuture > 0 && (
        <div className="max-w-xl mx-auto bg-[#131314] mt-10 p-6 rounded-xl text-center border border-gray-800">
          <h2 className="text-2xl font-bold">Future Overall Attendance</h2>
          <p className={`text-5xl mt-3 font-extrabold ${overallFuture < 75 ? "text-red-500" : "text-green-400"}`}>
            {overallFuture}%
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="footer footer-center text-gray-500 mt-20 p-6 border-t border-gray-800">
        <aside>
          <p>© 2025 Self Attendance System | Designed by Deepak</p>
        </aside>
      </footer>
    </div>
  );
};

export default Prediction;
