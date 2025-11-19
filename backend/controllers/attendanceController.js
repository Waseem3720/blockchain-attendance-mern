import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import StudentChain from "../blockchain/StudentChain.js";

// In-memory student chains (reuse from studentController ideally)
const studentChains = {};

// Mark attendance for a student
export const markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Get or initialize student chain
    let stuChain = studentChains[student._id];
    if (!stuChain) {
      stuChain = new StudentChain();
      stuChain.createStudentGenesisBlock("0", {
        studentId: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        departmentId: student.departmentId,
        classId: student.classId,
      });
      studentChains[student._id] = stuChain;
    }

    // Add attendance block
    const newBlock = stuChain.addAttendance({
      studentId: student._id,
      departmentId: student.departmentId,
      classId: student.classId,
      status,
      timestamp: new Date().toISOString(),
    });

    // Save attendance to DB
    const attendance = new Attendance({
      studentId: student._id,
      departmentId: student.departmentId,
      classId: student.classId,
      status,
      timestamp: new Date(),
      blockHash: newBlock.hash,
      prevHash: newBlock.prev_hash,
      nonce: newBlock.nonce,
    });

    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance by student
export const getAttendanceByStudent = async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.params.studentId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance by class
export const getAttendanceByClass = async (req, res) => {
  try {
    const attendance = await Attendance.find({ classId: req.params.classId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance by department
export const getAttendanceByDepartment = async (req, res) => {
  try {
    const attendance = await Attendance.find({ departmentId: req.params.departmentId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
