import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    status: { type: String, enum: ["Present", "Absent", "Leave"], required: true },
    timestamp: { type: Date, default: Date.now },
    blockHash: { type: String, required: true },
    prevHash: { type: String, required: true },
    nonce: { type: Number, required: true },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
