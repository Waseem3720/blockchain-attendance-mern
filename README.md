# Blockchain-Based Attendance Management System 

## Overview
This is the backend API for the Blockchain-Based Attendance Management System (BAMS). It implements a 3-layer hierarchical blockchain structure: Department → Class → Student → Attendance.

## Features
- ✅ **3-Layer Hierarchical Blockchain**
- ✅ **SHA-256 Hashing**
- ✅ **Proof of Work (PoW)**
- ✅ **Complete CRUD Operations**
- ✅ **Immutable Attendance Records**
- ✅ **Blockchain Validation**
- ✅ **Search Functionality**
- ✅ **RESTful API Design**

## Tech Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Crypto** - SHA-256 hashing (built-in)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/bams_blockchain
BLOCKCHAIN_DIFFICULTY=4
CORS_ORIGIN=http://localhost:3000
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Run the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Departments
- `POST /api/departments` - Create department
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department (soft)
- `GET /api/departments/search/:term` - Search departments
- `GET /api/departments/:id/blockchain` - Get blockchain
- `GET /api/departments/:id/validate` - Validate blockchain
- `GET /api/departments/:id/history` - Get history
- `GET /api/departments/:id/stats` - Get statistics

### Classes
- `POST /api/classes` - Create class
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `GET /api/classes/department/:departmentId` - Get classes by department
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class (soft)
- `GET /api/classes/search/:term` - Search classes
- `GET /api/classes/:id/blockchain` - Get blockchain
- `GET /api/classes/:id/validate` - Validate blockchain
- `GET /api/classes/:id/history` - Get history
- `GET /api/classes/:id/stats` - Get statistics

### Students
- `POST /api/students` - Create student
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/class/:classId` - Get students by class
- `GET /api/students/department/:departmentId` - Get students by department
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student (soft)
- `GET /api/students/search/name/:term` - Search by name
- `GET /api/students/search/roll/:term` - Search by roll number
- `GET /api/students/:id/blockchain` - Get blockchain
- `GET /api/students/:id/validate` - Validate blockchain
- `GET /api/students/:id/history` - Get history
- `GET /api/students/:id/attendance` - Get attendance

### Attendance
- `POST /api/attendance/mark` - Mark attendance
- `POST /api/attendance/mark-bulk` - Mark bulk attendance
- `GET /api/attendance/today` - Get today's attendance
- `GET /api/attendance/recent` - Get recent attendance
- `GET /api/attendance/student/:studentId` - Get student attendance
- `GET /api/attendance/class/:classId` - Get class attendance
- `GET /api/attendance/department/:departmentId` - Get department attendance
- `GET /api/attendance/date/:date` - Get attendance by date
- `GET /api/attendance/range` - Get attendance by date range
- `GET /api/attendance/search` - Search attendance
- `GET /api/attendance/stats/class/:classId` - Get class stats
- `GET /api/attendance/stats/department/:departmentId` - Get department stats
- `GET /api/attendance/verify/:attendanceId` - Verify attendance

## Blockchain Structure

### Layer 1: Department Chain
- Genesis block with `previousHash = '0'`
- Independent top-level chain
- Contains department metadata

### Layer 2: Class Chain
- Genesis block with `previousHash = departmentChain.latestHash`
- Child of department chain
- Contains class metadata

### Layer 3: Student Chain
- Genesis block with `previousHash = classChain.latestHash`
- Child of class chain
- Contains student metadata and attendance blocks

### Attendance Blocks
- Attached to student chain
- Contains: status (Present/Absent/Leave), timestamp, etc.
- Mined with Proof of Work

## Project Structure
```
backend/
├── blockchain/
│   ├── Block.js              # Block class
│   ├── Blockchain.js         # Base blockchain class
│   ├── DepartmentChain.js    # Department blockchain
│   ├── ClassChain.js         # Class blockchain
│   ├── StudentChain.js       # Student blockchain
│   └── validation.js         # Validation functions
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── departmentController.js
│   ├── classController.js
│   ├── studentController.js
│   └── attendanceController.js
├── models/
│   ├── Department.js
│   ├── Class.js
│   ├── Student.js
│   └── Attendance.js
├── routes/
│   ├── departmentRoutes.js
│   ├── classRoutes.js
│   ├── studentRoutes.js
│   └── attendanceRoutes.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Testing the API

### Using cURL

**Create Department:**
```bash
curl -X POST http://localhost:5000/api/departments \
  -H "Content-Type: application/json" \
  -d '{
    "departmentId": "CS",
    "departmentName": "School of Computing",
    "description": "Computer Science Department"
  }'
```

**Create Class:**
```bash
curl -X POST http://localhost:5000/api/classes \
  -H "Content-Type: application/json" \
  -d '{
    "classId": "CS101",
    "className": "Introduction to Programming",
    "section": "A",
    "departmentId": "CS"
  }'
```

**Create Student:**
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STU001",
    "studentName": "John Doe",
    "rollNumber": "2024001",
    "classId": "CS101",
    "departmentId": "CS",
    "email": "john@example.com"
  }'
```

**Mark Attendance:**
```bash
curl -X POST http://localhost:5000/api/attendance/mark \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STU001",
    "status": "Present",
    "remarks": "On time",
    "markedBy": "admin"
  }'
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- For Atlas, whitelist your IP address

### Port Already in Use
- Change PORT in .env file
- Or kill the process using port 5000

### Module Not Found Errors
- Run `npm install` again
- Delete node_modules and package-lock.json, then reinstall

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT

## Author
Waseem Hanif
