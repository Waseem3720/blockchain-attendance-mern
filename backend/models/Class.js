import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    meta: { type: String },
    status: { type: String, default: "active" }, // active / deleted
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ClassModel = mongoose.model("Class", classSchema);
export default ClassModel;
