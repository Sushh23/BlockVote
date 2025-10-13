// scripts/mineBlocks.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Mining blocks with account:", deployer.address);

  // Mine 20 blocks by sending empty transactions
  for (let i = 0; i < 20; i++) {
    const tx = await deployer.sendTransaction({
      to: deployer.address,
      value: 0
    });
    await tx.wait();
    console.log(`Mined block ${i + 1}`);
  }

  console.log("Successfully mined 20 blocks!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });