import React, { useEffect, useState } from "react";
import axios from "axios";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [meta, setMeta] = useState("");

  const fetchDepartments = async () => {
    const res = await axios.get("http://localhost:5000/api/departments");
    setDepartments(res.data);
  };

  const addDepartment = async () => {
    if (!name) return;
    await axios.post("http://localhost:5000/api/departments", { name, meta });
    setName("");
    setMeta("");
    fetchDepartments();
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div>
      <h2>Departments</h2>

      <div>
        <input
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Meta"
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
        />
        <button onClick={addDepartment}>Add Department</button>
      </div>

      <ul>
        {departments.map((dept) => (
          <li key={dept._id}>
            {dept.name} - {dept.meta} - Status: {dept.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Departments;
