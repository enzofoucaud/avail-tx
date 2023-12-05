import {
  getDecimals,
  initialize,
  formatNumberToBalance,
  getKeyringFromSeed,
  isValidAddress,
} from "avail-js-sdk";
import * as fs from "fs";
import axios from "axios";

async function getRecipient(token: string): Promise<string> {
  const limit = 100;
  const url: string = `https://discord.com/api/v9/channels/1179480016141168720/messages?limit=${limit}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return response.data[Math.floor(Math.random() * limit)].content;
  } catch (error) {
    throw error;
  }
}

const main = async () => {
  // read config file
  let config = JSON.parse(fs.readFileSync("config.json", "utf8"));
  // send 1 AVAIL to one random recipient for each seed
  for (let i = 0; i < config.seeds.length; i++) {
    // get seed and recipient
    let seed = config.seeds[i];
    let recipient = await getRecipient(config.token).then((recipient) => {
      return recipient;
    });
    // initialize avail
    const api = await initialize();
    const keyring = getKeyringFromSeed(seed);
    const options = { app_id: 0, nonce: -1 };
    // try to send 1 AVAIL
    try {
      if (!isValidAddress(await recipient))
        throw new Error("Invalid Recipient");
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
