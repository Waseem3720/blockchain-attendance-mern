import express from "express";
import {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  getAttendanceByDepartment,
} from "../controllers/attendanceController.js";

const router = express.Router();

// Mark attendance for a student
router.post("/", markAttendance);

// Get attendance history for a student
router.get("/student/:studentId", getAttendanceByStudent);

// Get attendance for a class
router.get("/class/:classId", getAttendanceByClass);

// Get attendance for a department
router.get("/department/:departmentId", getAttendanceByDepartment);

export default router;
