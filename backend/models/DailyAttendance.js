import mongoose from "mongoose";

const dailyAttendanceSchema = new mongoose.Schema({
  studentid: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  attendance: [
    {
      subjectname: { type: String, required: true },
      present: { type: Boolean, default: false },
      absent: { type: Boolean, default: false },
      nottaken: { type: Boolean, default: false }
    }
  ]
});

dailyAttendanceSchema.index({ studentid: 1, date: 1 }, { unique: true });

const DailyAttendance = mongoose.model("DailyAttendance", dailyAttendanceSchema);
export default DailyAttendance;
