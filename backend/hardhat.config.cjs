// Use 'require' instead of 'import' for CommonJS (.cjs)
require("@nomicfoundation/hardhat-ethers");
require("dotenv/config");

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      // Hardhat's default 0x... address will be used as the owner/deployer.
    },
  },
};

// Use 'module.exports' instead of 'export default' for CommonJS (.cjs)
module.exports = config;