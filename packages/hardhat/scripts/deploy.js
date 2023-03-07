const hre = require("hardhat");

async function main() {
  const SupportToken = await hre.ethers.getContractFactory("SupportToken");
  const supportToken = await SupportToken.deploy();
  await supportToken.deployed();
  console.log("SupportToken address deployed to:", supportToken.address);
}

main();
