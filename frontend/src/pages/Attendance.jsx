import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Attendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setStudent(storedUser);
      fetchSubjects(storedUser.email);
    } else {
      toast.error("No student data found in localStorage");
    }
  }, []);

  const fetchSubjects = async (id) => {
    try {
      const res = await axios.get(`/subject/allsubjects/${id}`);
      setSubjects(res.data.subjects || []);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching subjects");
    }
  };

  const handleAttendanceChange = (subjectName, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [subjectName]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    const attendanceArray = subjects.map((sub) => ({
      subjectname: sub.subjectname,
      present: attendanceData[sub.subjectname] === "present",
      absent: attendanceData[sub.subjectname] === "absent",
      nottaken: attendanceData[sub.subjectname] === "nottaken",
    }));
    console.log("attarray==",attendanceArray)
    try {
      await axios.put("/subject/attendance", {
        studentid: student.email,
        date: selectedDate,
        attendance: attendanceArray,
      });

      toast.success("Attendance updated successfully!");
      fetchSubjects(student.email);
      setAttendanceData({});
      setSelectedDate("");
    } catch (err) {
      console.error(err);
      toast.error("Error updating attendance");
    }
  };

  return (
    <div className="min-h-screen bg-[#274c77] flex flex-col items-center text-[#e7ecefff]">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center bg-[#274c77ff]/80 backdrop-blur-md p-4 rounded-md mb-6 shadow-md">
        <span className="text-2xl font-bold">🎓 MyAttendance</span>
        <Link
          to="/dashboard"
          className="px-4 py-2 border border-[#e7ecefff] rounded-lg hover:bg-[#e7ecefff] hover:text-[#274c77ff] transition"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-3xl bg-[#274c77]/10 p-6 rounded-xl shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center mb-4">Daily Attendance</h2>

        {student && (
          <p className="text-center mb-4">
            Welcome, <b>{student.email}</b>
          </p>
        )}

        <div className="mb-6">
          <label className="font-semibold mb-2 block">Select Date</label>
          <input
            type="date"
            className="w-full p-2 rounded-md"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {subjects.length > 0 ? (
          <div className="space-y-4">
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                className="bg-[#e7ecefff]/10 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center shadow"
              >
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg font-semibold">{sub.subjectname}</h3>
                  <p className="text-sm">
                    Total: <b>{sub.totalclass}</b> | Attended: <b>{sub.attended}</b>
                  </p>
                </div>

                {/* Button Group */}
                <div className="flex gap-2 flex-wrap">
                  {["absent", "present", "nottaken"].map((val, i) => (
                    <React.Fragment key={val}>
                      <input
                        type="radio"
                        name={sub.subjectname} // same name for the group
                        id={`${sub.subjectname}-${i}`}
                        value={val}
                        // checked={attendanceData[sub.subjectname] === val}
                        onChange={(e) =>
                          handleAttendanceChange(sub.subjectname, e.target.value)
                        }
                        className="hidden"
                      />
                      <label
                        htmlFor={`${sub.subjectname}-${i}`}
                        className={`px-4 py-2 rounded-lg cursor-pointer border font-medium transition text-center ${attendanceData[sub.subjectname] === val
                            ? "bg-[#e7ecefff] text-[#274c77ff]"
                            : "bg-transparent text-[#e7ecefff]"
                          }`}
                        style={{ border: "1.5px solid #e7ecefff" }}
                      >
                        {val.charAt(0).toUpperCase() + val.slice(1)}
                      </label>
                    </React.Fragment>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-6">No subjects found.</p>
        )}

        {subjects.length > 0 && (
          <button
            className="w-full mt-6 px-4 py-2 font-semibold rounded-lg border border-[#e7ecefff] hover:bg-[#e7ecefff] hover:text-[#274c77ff] transition"
            onClick={handleSubmit}
          >
            Submit Attendance
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm opacity-80">
        © {new Date().getFullYear()} MyAttendance · Designed with Dusk-Blue & Platinum
      </footer>
    </div>
  );
};

export default Attendance;
