import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
      <div className="card bg-base-100 shadow-2xl w-full md:w-3/4 lg:w-1/2">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
            Daily Attendance
          </h2>

          {student && (
            <p className="text-center text-gray-600 mb-4">
              Welcome, <b>{student.email}</b>
            </p>
          )}

          <div className="form-control mb-4">
            <label className="label font-semibold text-gray-700">Select Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {subjects.length > 0 ? (
            <div className="space-y-4">
              {subjects.map((sub, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 p-4 rounded-lg flex justify-between items-center shadow"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-800">
                      {sub.subjectname}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Total: <b>{sub.totalclass}</b> | Attended:{" "}
                      <b>{sub.attendedclass}</b>
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    {/* Absent */}
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2 text-gray-600">Absent</span>
                      <input
                        type="radio"
                        name={sub.subjectname}
                        value="absent"
                        className="radio radio-error"
                        checked={attendanceData[sub.subjectname] === "absent"}
                        onChange={(e) =>
                          handleAttendanceChange(sub.subjectname, e.target.value)
                        }
                      />
                    </label>

                    {/* Present */}
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2 text-gray-600">Present</span>
                      <input
                        type="radio"
                        name={sub.subjectname}
                        value="present"
                        className="radio radio-success"
                        checked={attendanceData[sub.subjectname] === "present"}
                        onChange={(e) =>
                          handleAttendanceChange(sub.subjectname, e.target.value)
                        }
                      />
                    </label>

                    {/* Not Taken */}
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2 text-gray-600">Not Taken</span>
                      <input
                        type="radio"
                        name={sub.subjectname}
                        value="nottaken"
                        className="radio radio-warning"
                        checked={attendanceData[sub.subjectname] === "nottaken"}
                        onChange={(e) =>
                          handleAttendanceChange(sub.subjectname, e.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">No subjects found.</p>
          )}

          {subjects.length > 0 && (
            <button className="btn btn-primary w-full mt-6" onClick={handleSubmit}>
              Submit Attendance
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
