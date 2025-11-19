import Department from "../models/Department.js";
import DepartmentChain from "../blockchain/DepartmentChain.js";

// Initialize department blockchain
const deptChain = new DepartmentChain();

export const createDepartment = async (req, res) => {
  try {
    const { name, meta } = req.body;

    const department = new Department({ name, meta });
    const savedDept = await department.save();

    // Add to blockchain
    deptChain.createDepartmentBlock({ departmentId: savedDept._id, name, meta });

    res.status(201).json(savedDept);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { name, meta } = req.body;
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });

    // Instead of editing, add blockchain update
    deptChain.createDepartmentBlock({
      departmentId: department._id,
      name_updated: name || department.name,
      meta_updated: meta || department.meta,
    });

    res.json({ message: "Department update added to blockchain" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });

    // Add deletion block to blockchain
    deptChain.createDepartmentBlock({
      departmentId: department._id,
      status: "deleted",
    });

    res.json({ message: "Department deletion added to blockchain" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
