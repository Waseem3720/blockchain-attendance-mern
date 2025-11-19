import Block from "./Block.js";

class Blockchain {
  constructor(name) {
    this.name = name;
    this.chain = [];
  }

  // Create genesis block
  createGenesisBlock(transactions = {}) {
    const genesis = new Block(
      0,
      Date.now().toString(),
      transactions,
      "0"
    );

    genesis.mineBlock(4);
    this.chain.push(genesis);
    return genesis;
  }

  // Get latest block in chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Add a new mined block
  addBlock(transactions) {
    const latest = this.getLatestBlock();

    const newBlock = new Block(
      latest.index + 1,
      Date.now().toString(),
      transactions,
      latest.hash
    );

    newBlock.mineBlock(4);
    this.chain.push(newBlock);

    return newBlock;
  }

  // Validate entire chain integrity
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.computeHash()) return false;
      if (current.prev_hash !== previous.hash) return false;
      if (!current.hash.startsWith("0000")) return false;
    }

    return true;
  }
}

export default Blockchain;
