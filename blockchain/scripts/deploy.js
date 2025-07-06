const hre = require("hardhat");

async function main() {
  const SimpleNotes = await hre.ethers.getContractFactory("SimpleNotes");
  const simpleNotes = await SimpleNotes.deploy();

  await simpleNotes.waitForDeployment();

  console.log(`SimpleNotes deployed to: ${simpleNotes.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});