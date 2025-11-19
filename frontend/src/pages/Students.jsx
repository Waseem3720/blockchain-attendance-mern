import React, { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [classId, setClassId] = useState("");

  const fetchDepartments = async () => {
    const res = await axios.get("http://localhost:5000/api/departments");
    setDepartments(res.data);
  };

  const fetchClasses = async () => {
    const res = await axios.get("http://localhost:5000/api/classes");
    setClasses(res.data);
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!name || !rollNumber || !departmentId || !classId) return;
    await axios.post("http://localhost:5000/api/students", {
      name,
      rollNumber,
      departmentId,
      classId,
    });
    setName("");
    setRollNumber("");
    setDepartmentId("");
    setClassId("");
    fetchStudents();
  };

  useEffect(() => {
    fetchDepartments();
    fetchClasses();
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>

      <div>
        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
        <select value={classId} onChange={(e) => setClassId(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <button onClick={addStudent}>Add Student</button>
      </div>

      <ul>
        {students.map((stu) => (
          <li key={stu._id}>
            {stu.name} ({stu.rollNumber}) - Class: {classes.find((c) => c._id === stu.classId)?.name || "Unknown"} - Department: {departments.find((d) => d._id === stu.departmentId)?.name || "Unknown"} - Status: {stu.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
