import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    meta: { type: String },
    status: { type: String, default: "active" }, // active / deleted
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
