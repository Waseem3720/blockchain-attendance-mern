import mongoose from "mongoose";
import dotenv from "dotenv";
import Department from "./models/Department.js";
import ClassModel from "./models/Class.js";
import Student from "./models/Student.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    // Clear existing data
    await Department.deleteMany({});
    await ClassModel.deleteMany({});
    await Student.deleteMany({});

    // Create Departments
    const dept1 = await Department.create({ name: "School of Computing" });
    const dept2 = await Department.create({ name: "School of Software Engineering" });

    const departments = [dept1, dept2];

    // Create 5 classes per department
    const classes = [];
    for (let dept of departments) {
      for (let i = 1; i <= 5; i++) {
        const cls = await ClassModel.create({
          name: `Class ${i}`,
          departmentId: dept._id,
        });
        classes.push(cls);

        // Create 35 students per class
        for (let j = 1; j <= 35; j++) {
          await Student.create({
            name: `Student ${j} - ${cls.name}`,
            rollNumber: `${cls.name}-S${j}`,
            departmentId: dept._id,
            classId: cls._id,
          });
        }
      }
    }

    console.log("Seeding completed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
