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
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f11] via-[#121214] to-[#0d0d0e] text-gray-300 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-black/40 backdrop-blur-md border-b border-gray-800 px-8 sticky top-0 z-10">
        <div className="flex-1">
          <span className="text-2xl font-semibold tracking-tight text-gray-200">
            🎓 Self Attendance
          </span>
        </div>
        <div className="flex-none">
          <Link
            to="/dashboard"
            className="btn btn-sm border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl font-bold text-gray-100">📚 Manage Your Subjects</h1>
        <p className="text-gray-500 mt-2">Add, view, and manage your subjects efficiently</p>
      </div>

      {/* Add Button */}
      <div className="flex justify-center mb-6">
        <button
          className="btn bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-200"
          onClick={() => document.getElementById("add_subject_modal").showModal()}
        >
          ➕ Add New Subject
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto max-w-5xl mx-auto mb-20">
        <div className="rounded-xl bg-black/30 backdrop-blur-md border border-gray-800 shadow-xl">
          <table className="table w-full text-gray-300">
            <thead className="bg-gradient-to-r from-[#1b1b1f] to-[#111112] text-gray-400 text-sm uppercase">
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Total</th>
                <th>Attended</th>
                <th>Percentage</th>
                <th>Action</th>
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
                      className="hover:bg-gray-800/40 transition-colors duration-200"
                    >
                      <td>{index + 1}</td>
                      <td className="font-semibold text-gray-100">{sub.subjectname}</td>
                      <td>{sub.totalClass}</td>
                      <td>{sub.attended}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-md text-xs ${
                            percent < 75
                              ? "bg-red-900/40 text-red-400"
                              : percent < 90
                              ? "bg-yellow-900/40 text-yellow-400"
                              : "bg-green-900/40 text-green-400"
                          }`}
                        >
                          {percent}%
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-xs border border-gray-700 text-gray-300 hover:bg-gray-800"
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
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No subjects added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <dialog id="add_subject_modal" className="modal">
        <div className="modal-box bg-[#111113]/90 backdrop-blur-md border border-gray-800 shadow-2xl text-gray-300">
          <h3 className="font-bold text-2xl text-center mb-4 text-gray-100">
            ➕ Add Subject
          </h3>
          <form onSubmit={handleAddSubject} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Subject Name"
              className="input bg-gray-900/40 border border-gray-700 text-gray-200"
              value={subjectName}
              onChange={(e) => setSubjectname(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Total Classes"
              className="input bg-gray-900/40 border border-gray-700 text-gray-200"
              value={totalClass}
              onChange={(e) => setTotalclass(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Attended Classes"
              className="input bg-gray-900/40 border border-gray-700 text-gray-200"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
            />
            <button className="btn bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 mt-2">
              Add Subject
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn border border-gray-700 text-gray-400 hover:bg-gray-800">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllSubjects;
