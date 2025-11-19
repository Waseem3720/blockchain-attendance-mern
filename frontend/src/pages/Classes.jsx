import React, { useEffect, useState } from "react";
import axios from "axios";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [meta, setMeta] = useState("");

  const fetchDepartments = async () => {
    const res = await axios.get("http://localhost:5000/api/departments");
    setDepartments(res.data);
  };

  const fetchClasses = async () => {
    const res = await axios.get("http://localhost:5000/api/classes");
    setClasses(res.data);
  };

  const addClass = async () => {
    if (!name || !departmentId) return;
    await axios.post("http://localhost:5000/api/classes", { name, departmentId, meta });
    setName("");
    setMeta("");
    setDepartmentId("");
    fetchClasses();
  };

  useEffect(() => {
    fetchDepartments();
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Classes</h2>

      <div>
        <input
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
        <input
          placeholder="Meta"
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
        />
        <button onClick={addClass}>Add Class</button>
      </div>

      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            {cls.name} - Department: {departments.find((d) => d._id === cls.departmentId)?.name || "Unknown"} - Status: {cls.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classes;
