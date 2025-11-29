import Subject from "../models/Subject.js"
import DailyAttendance from "../models/DailyAttendance.js";
export const addsubject = async (req, res) => {
    try {
        const { studentid, subjectname, totalClass, attended } = req.body
        console.log(studentid, subjectname)

        const subjectwithuser = await Subject.findOne({ studentid })
        if (!subjectwithuser) {
            const newsubjectwithuser = new Subject({
                studentid: studentid,
                subjects: [
                    {
                        name: subjectname,
                        totalclass: totalClass,
                        attendedclass: attended
                    }

                ]
            })
            await newsubjectwithuser.save()
            res.status(200).json({ message: "Subject added successfully" })
        }
        else {
            const subjectexist = await subjectwithuser.subjects.some((s) => s.name === subjectname)
            if (subjectexist) {
                return res.status(400).json({ message: "Subject with same name already there" })
            }
            await Subject.updateOne(
                { studentid: studentid },
                {
                    $push: {
                        subjects: {
                            name: subjectname,
                            totalclass: totalClass,
                            attendedclass: attended
                        }
                    }
                }
            )
        }
    } catch (error) {

    }
}
export const allsubjects = async (req, res) => {
    const { studentid } = req.params
    const subjects = []
    try {
        const subject = await Subject.findOne({ studentid: studentid })
        // console.log(subject)
        if (!subject) {
            return res.status(404).json({ message: "No subjects from this student" })
        }
        subject.subjects.forEach(element => {
            subjects.push({ id: element._id, subjectname: element.name, totalClass: element.totalclass, attended: element.attendedclass })
        });
        // console.log(subjects)
        res.status(200).json({ subjects: subjects })
    } catch (error) {

    }
}

export const deleteSubject = async (req, res) => {
    const subjectdetails = req.body
    console.log(subjectdetails)
    try {
        const updatedDoc = await Subject.findOneAndUpdate(
            { studentid: subjectdetails.studentid },
            { $pull: { subjects: { _id: subjectdetails.subjectid } } },
        )
        if (!updatedDoc) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({
            message: "Subject deleted successfully",
            subjects: updatedDoc.subjects,
        });
    } catch (error) {

    }
}


export const updateAttendance = async (req, res) => {
  try {
    const { studentid, date, attendance } = req.body;

    console.log("Student:", studentid);
    console.log("Date:", date);
    console.log("Attendance:", attendance);

    // 1️⃣ Prevent duplicate attendance for same day
    const exists = await DailyAttendance.findOne({ studentid, date });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Attendance already submitted for this date"
      });
    }

    // 2️⃣ Update Subject schema totals
    for (const item of attendance) {
      const { subjectname, present, absent, nottaken } = item;

      // if subject was not taken → skip updating totals
      if (nottaken) {
        console.log(`Subject ${subjectname} not taken → No update`);
        continue;
      }

      await Subject.updateOne(
        { studentid, "subjects.name": subjectname },
        {
          $inc: {
            "subjects.$.totalclass": 1,
            "subjects.$.attendedclass": present ? 1 : 0
          }
        }
      );
    }

    // 3️⃣ Save daily attendance record
    await DailyAttendance.create({
      studentid,
      date,
      attendance
    });

    res.json({
      success: true,
      message: "Attendance updated successfully"
    });

  } catch (error) {
    console.error("Error in attendance update:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Attendance already exists for this date"
      });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
