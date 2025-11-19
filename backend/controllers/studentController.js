import Student from "../models/Student.js";
import ClassModel from "../models/Class.js";
import StudentChain from "../blockchain/StudentChain.js";

// Store student chains in memory (keyed by studentId)
const studentChains = {};

// Helper: get class's latest hash
const getClassLastHash = async (classId) => {
  const clsChain = new ClassChain();
  const latest = clsChain.getLatestBlock();
  return latest ? latest.hash : "0";
};

export const createStudent = async (req, res) => {
  try {
    const { name, rollNumber, departmentId, classId } = req.body;
    const cls = await ClassModel.findById(classId);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    const student = new Student({ name, rollNumber, departmentId, classId });
    const savedStudent = await student.save();

    const classLastHash = await getClassLastHash(classId);

    const stuChain = new StudentChain();
    stuChain.createStudentGenesisBlock(classLastHash, {
      studentId: savedStudent._id,
      name,
      rollNumber,
      departmentId,
      classId,
    });

    studentChains[savedStudent._id] = stuChain;

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { name, rollNumber } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const stuChain = studentChains[student._id];
    if (!stuChain) return res.status(400).json({ message: "Student chain not found" });

    stuChain.updateStudent({
      name_updated: name || student.name,
      rollNumber_updated: rollNumber || student.rollNumber,
    });

    res.json({ message: "Student update added to blockchain" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const stuChain = studentChains[student._id];
    if (!stuChain) return res.status(400).json({ message: "Student chain not found" });

    stuChain.updateStudent({ status: "deleted" });

    res.json({ message: "Student deletion added to blockchain" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
