import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    status: { type: String, default: "active" }, // active / deleted
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
