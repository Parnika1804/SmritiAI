import hre from "hardhat";

async function main() {
  const FIRRegistry = await hre.ethers.getContractFactory("FIRRegistry");
  const registry = await FIRRegistry.deploy();
  await registry.waitForDeployment();
  console.log("FIRRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});