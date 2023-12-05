import {
  getDecimals,
  initialize,
  formatNumberToBalance,
  getKeyringFromSeed,
  isValidAddress,
} from "avail-js-sdk";
import * as fs from "fs";

const main = async () => {
  // get seeds
  const seeds = fs.readFileSync("seeds.txt", "utf8");
  const seedList = seeds.split("\n");
  // get recipients
  const recipients = fs.readFileSync("address.txt", "utf8");
  const recipientList = recipients.split("\n");

  // send 1 AVAIL to one random recipient for each seed
  for (let i = 0; i < seedList.length; i++) {
    // get seed and recipient
    let seed = seedList[i];
    let recipient =
      recipientList[Math.floor(Math.random() * recipientList.length)];
    // initialize avail
    const api = await initialize();
    const keyring = getKeyringFromSeed(seed);
    const options = { app_id: 0, nonce: -1 };
    // try to send 1 AVAIL
    try {
      if (!isValidAddress(recipient)) throw new Error("Invalid Recipient");
      console.log("Sending 1 AVAIL from:", keyring.address, "to:", recipient);
      await api.tx.balances
        .transfer(recipient, formatNumberToBalance(1, getDecimals(api)))
        .signAndSend(keyring, options);
      console.log("Transfer successful");
    } catch (err) {
      console.log("Transfer failed");
      process.exit(1);
    }
  }

  // exit
  process.exit(0);
};
main();
