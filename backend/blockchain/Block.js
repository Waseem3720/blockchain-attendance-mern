import crypto from "crypto";

class Block {
  constructor(index, timestamp, transactions, prev_hash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.prev_hash = prev_hash;
    this.nonce = 0;
    this.hash = this.computeHash();
  }

  computeHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.prev_hash +
          this.nonce
      )
      .digest("hex");
  }

  mineBlock(difficulty = 4) {
    while (this.hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
      this.nonce++;
      this.hash = this.computeHash();
    }
    return this.hash;
  }
}

export default Block;
