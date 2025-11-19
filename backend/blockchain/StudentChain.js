import Blockchain from "./Blockchain.js";
import Block from "./Block.js";

class StudentChain extends Blockchain {
  constructor() {
    super("StudentChain");
  }

  // Genesis block must use latest class block hash
  createStudentGenesisBlock(classLastHash, studentData) {
    const genesis = new Block(
      0,
      Date.now().toString(),
      {
        type: "STUDENT_GENESIS",
        ...studentData,
      },
      classLastHash
    );

    genesis.mineBlock(4);
    this.chain.push(genesis);
    return genesis;
  }

  // Add student updates or deletion
  updateStudent(studentData) {
    return this.addBlock({
      type: "STUDENT_UPDATE",
      ...studentData,
    });
  }

  // Add attendance record
  addAttendance(attendanceData) {
    return this.addBlock({
      type: "ATTENDANCE",
      ...attendanceData,
    });
  }
}

export default StudentChain;
