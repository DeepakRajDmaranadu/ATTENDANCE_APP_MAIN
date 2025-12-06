import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllSubjects = () => {
  const [subjectName, setSubjectname] = useState("");
  const [totalClass, setTotalclass] = useState("");
  const [attended, setAttended] = useState("");
  const [fetchedsubjects, setFetchedsubjects] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const fetchsubjects = async () => {
    try {
      const response = await axios.get(`/subject/allsubjects/${storedUser.email}`);
      setFetchedsubjects(response.data.subjects);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/subject/addsubject", {
        studentid: storedUser.email,
        subjectname: subjectName,
        totalClass,
        attended,
      });
      toast.success(response.data.message);
      document.getElementById("add_subject_modal").close();
      setSubjectname("");
      setTotalclass("");
      setAttended("");
      await fetchsubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding subject");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`/subject/deletesub`, {
        studentid: storedUser.email,
        subjectid: id,
      });
      toast.success(response.data.message);
      await fetchsubjects();
    } catch (error) {
      toast.error("Error deleting subject");
    }
  };

  useEffect(() => {
    fetchsubjects();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#274c77", color: "#e7ecef" }}
    >
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 border-b"
        style={{ borderColor: "#e7ecef" }}>
        <span className="text-2xl font-semibold">🎓 Self Attendance</span>
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-md border transition duration-200"
          style={{ borderColor: "#e7ecef", color: "#e7ecef" }}
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

      {/* Header */}
      <div className="text-center mt-8 mb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold">📚 Manage Your Subjects</h1>
        <p className="text-sm md:text-base opacity-90 mt-1">
          Add, view, and manage your subjects efficiently
        </p>
      </div>

      {/* Add Button */}
      <div className="flex justify-center mb-6 px-4">
        <button
          className="px-4 py-2 rounded-md border font-medium transition duration-200"
          style={{ borderColor: "#e7ecef", color: "#e7ecef" }}
          onClick={() => document.getElementById("add_subject_modal").showModal()}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e7ecef";
            e.target.style.color = "#274c77";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#e7ecef";
          }}
        >
          ➕ Add New Subject
        </button>
      </div>

      {/* Table Section */}
      {/* Table Section */}
      <div className="px-4 mb-20 overflow-x-auto">
        <div
          className="inline-block min-w-full rounded-xl shadow-lg"
          style={{
            backgroundColor: "#e7ecefff",
            color: "#274c77",
            border: "1px solid #274c77",
          }}
        >
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: "2px solid #274c77" }}>
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Subject</th>
                <th className="py-2 px-3">Total</th>
                <th className="py-2 px-3">Attended</th>
                <th className="py-2 px-3">%</th>
                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {fetchedsubjects.length > 0 ? (
                fetchedsubjects.map((sub, index) => {
                  const percent =
                    sub.totalClass > 0
                      ? ((sub.attended / sub.totalClass) * 100).toFixed(2)
                      : 0;
                  return (
                    <tr
                      key={index}
                      className="hover:bg-[#274c77]/10 transition-colors"
                    >
                      <td className="py-2 px-3 ">{index + 1}</td>
                      <td className="py-2 px-3 font-semibold">{sub.subjectname}</td>
                      <td className="py-2 px-3">{sub.totalClass}</td>
                      <td className="py-2 px-3">{sub.attended}</td>
                      <td
                        className="py-2 px-3 font-bold"
                        style={{ color: percent < 75 ? "#a11a1a" : "#274c77" }}
                      >
                        {percent}%
                      </td>
                      <td className="py-2 px-3">
                        <button
                          className="px-3 py-1 rounded-md border transition duration-200"
                          style={{ borderColor: "#274c77", color: "#274c77" }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#274c77";
                            e.target.style.color = "#e7ecef";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#274c77";
                          }}
                          onClick={() => handleDelete(sub.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 opacity-70">
                    No subjects added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Add Modal */}
      <dialog id="add_subject_modal" className="w-full max-w-md p-0 rounded-lg">
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: "#274c77",
            color: "#e7ecef",
            border: "2px solid #e7ecef",
          }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">➕ Add Subject</h3>
          <form className="flex flex-col gap-3" onSubmit={handleAddSubject}>
            <input
              type="text"
              placeholder="Subject Name"
              className="px-3 py-2 rounded-md border"
              style={{ borderColor: "#e7ecef", backgroundColor: "#e7ecefff", color: "#274c77" }}
              value={subjectName}
              onChange={(e) => setSubjectname(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Total Classes"
              className="px-3 py-2 rounded-md border"
              style={{ borderColor: "#e7ecef", backgroundColor: "#e7ecefff", color: "#274c77" }}
              value={totalClass}
              onChange={(e) => setTotalclass(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Attended Classes"
              className="px-3 py-2 rounded-md border"
              style={{ borderColor: "#e7ecef", backgroundColor: "#e7ecefff", color: "#274c77" }}
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 rounded-md font-medium transition duration-200"
              style={{ borderColor: "#e7ecef", backgroundColor: "#e7ecefff", color: "#274c77" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#274c77";
                e.target.style.color = "#e7ecef";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#e7ecefff";
                e.target.style.color = "#274c77";
              }}
            >
              Add Subject
            </button>
          </form>
          <div className="mt-3 text-center">
            <button
              className="px-4 py-2 rounded-md border transition duration-200"
              style={{ borderColor: "#e7ecef", color: "#e7ecef" }}
              onClick={() => document.getElementById("add_subject_modal").close()}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e7ecef";
                e.target.style.color = "#274c77";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#e7ecef";
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllSubjects;
