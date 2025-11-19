import Blockchain from "./Blockchain.js";

class DepartmentChain extends Blockchain {
  constructor() {
    super("DepartmentChain");
  }

  // Create genesis block for a new department
  createDepartmentBlock(departmentData) {
    if (this.chain.length === 0) {
      return this.createGenesisBlock({
        type: "DEPARTMENT_GENESIS",
        ...departmentData,
      });
    }

    return this.addBlock({
      type: "DEPARTMENT_UPDATE",
      ...departmentData,
    });
  }
}

export default DepartmentChain;
