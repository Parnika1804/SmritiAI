import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

export default {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};