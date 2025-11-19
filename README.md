# BAMS MERN Blockchain

**BAMS** – Blockchain-based Attendance Management System built with the **MERN stack** (MongoDB, Express, React, Node.js) and a **custom multi-layered blockchain** for attendance management.

---

## **Project Overview**

This project implements a hierarchical blockchain system for attendance management:

- **Department Blockchain**  
- **Class Blockchain** (child of Department)  
- **Student Blockchain** (child of Class)  
- **Attendance Blocks** for each student  

**Key Features:**

- Full CRUD operations for Departments, Classes, and Students  
- Attendance marking: Present, Absent, Leave  
- Multi-layered blockchain with SHA-256 hashing and Proof of Work (PoW)  
- Blockchain validation for all chains  
- React frontend with a blockchain explorer  
- Dynamic addition/removal of departments, classes, and students  

---

## **Setup Instructions**

## **1. Create a .env**

### **2. Backend Setup**

 Navigate to the backend folder:

```bash
cd backend
npm install
node seed.js
npm run dev


### **3. Backend Setup**

 Navigate to the frontend folder:

 ``bash
 
cd frontend
npm install
npm start
