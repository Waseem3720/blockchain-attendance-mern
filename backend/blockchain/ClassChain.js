import Blockchain from "./Blockchain.js";
import Block from "./Block.js";

class ClassChain extends Blockchain {
  constructor() {
    super("ClassChain");
  }

  // Genesis block must use the latest department block hash
  createClassGenesisBlock(departmentLastHash, classData) {
    const genesis = new Block(
      0,
      Date.now().toString(),
      {
        type: "CLASS_GENESIS",
        ...classData,
      },
      departmentLastHash // parent hash linkage
    );

    genesis.mineBlock(4);
    this.chain.push(genesis);
    return genesis;
  }

  // New block for updates/deletion
  updateClass(classData) {
    return this.addBlock({
      type: "CLASS_UPDATE",
      ...classData,
    });
  }
}

export default ClassChain;
