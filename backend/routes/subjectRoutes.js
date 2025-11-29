import express from 'express'
import { addsubject, allsubjects, deleteSubject, updateAttendance } from '../controllers/subjectController.js'

const router=express.Router()

router.post("/addsubject",addsubject)
router.get("/allsubjects/:studentid",allsubjects)
router.post("/deletesub",deleteSubject)
router.put("/attendance",updateAttendance)

export default router