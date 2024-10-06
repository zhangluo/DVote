async function main() {
    const DVote = await ethers.getContractFactory("DVote");
    console.log("Deploying DVote...");

    const feeData = await ethers.provider.getFeeData();
    const dvote = await DVote.deploy({
        maxFeePerGas: feeData.maxFeePerGas, // 使用当前的最大费用
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas, // 使用当前的优先费用
        gasLimit: 1000000
    });
    await dvote.deployed();

    console.log("DVote deployed to:", dvote.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  