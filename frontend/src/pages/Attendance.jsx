import React, { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  const fetchAttendance = async (id) => {
    if (!id) return;
    const res = await axios.get(`http://localhost:5000/api/attendance/student/${id}`);
    setRecords(res.data);
  };

  const markAttendance = async () => {
    if (!studentId || !status) return;
    await axios.post("http://localhost:5000/api/attendance", { studentId, status });
    fetchAttendance(studentId);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Attendance</h2>

      <div>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>{s.name} ({s.rollNumber})</option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>

        <button onClick={markAttendance}>Mark Attendance</button>
      </div>

      <h3>Attendance Records</h3>
      <ul>
        {records.map((r) => (
          <li key={r._id}>
            {new Date(r.timestamp).toLocaleString()} - Status: {r.status} - BlockHash: {r.blockHash.substring(0, 10)}...
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;
