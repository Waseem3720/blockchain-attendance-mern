import ClassModel from "../models/Class.js";
import Department from "../models/Department.js";
import ClassChain from "../blockchain/ClassChain.js";

// Store class chains in memory (keyed by classId)
const classChains = {};

// Helper: get department's latest hash
const getDepartmentLastHash = async (departmentId) => {
  const deptChain = new (await import("../blockchain/DepartmentChain.js")).default();
  const latest = deptChain.getLatestBlock();
  return latest ? latest.hash : "0";
};

export const createClass = async (req, res) => {
  try {
    const { name, departmentId, meta } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: "Department not found" });

    const newClass = new ClassModel({ name, departmentId, meta });
    const savedClass = await newClass.save();

    const deptLastHash = await getDepartmentLastHash(departmentId);

    const clsChain = new ClassChain();
    clsChain.createClassGenesisBlock(deptLastHash, {
      classId: savedClass._id,
      name,
      departmentId,
    });

    classChains[savedClass._id] = clsChain;

    res.status(201).json(savedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const cls = await ClassModel.findById(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });
    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { name, meta } = req.body;
    const cls = await ClassModel.findById(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    // Add update block instead of modifying
    const clsChain = classChains[cls._id];
    if (!clsChain) return res.status(400).json({ message: "Class chain not found" });

    clsChain.updateClass({
      classId: cls._id,
      name_updated: name || cls.name,
      meta_updated: meta || cls.meta,
    });

    res.json({ message: "Class update added to blockchain" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const cls = await ClassModel.findById(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    const clsChain = classChains[cls._id];
    if (!clsChain) return res.status(400).json({ message: "Class chain not found" });

    clsChain.updateClass({ classId: cls._id, status: "deleted" });

    res.json({ message: "Class deletion added to blockchain" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
