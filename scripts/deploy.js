async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const FIRRegistration = await ethers.getContractFactory("FIRRegistration");
  const firRegistration = await FIRRegistration.deploy();

  console.log("FIRRegistration contract address:", firRegistration.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
