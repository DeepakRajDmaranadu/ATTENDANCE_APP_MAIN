import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  studentid: {
    type: String,
    required: true
  },
  subjects: [
    {
      name: {   // <-- FIXED (same as frontend)
        type: String,
        required: true
      },
      totalclass: {
        type: Number,
        default: 0  
      },
      attendedclass: {
        type: Number,
        default: 0
      }
    }
  ]
});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
