import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS} from "../helper-hardhat-config"
import verify from "../utils/verify"
import {DeployFunction} from "hardhat-deploy/types"
import {HardhatRuntimeEnvironment} from "hardhat/types"

const deployNftMarketplace: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
  ) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const args: any[] = []
    // const nftMarketplace = await deploy("NftMarketplace", {
    //     from: deployer,
    //     args: args,
    //     log: true,
    //     waitConfirmations: waitBlockConfirmations,
    // })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify("0x5FbDB2315678afecb367f032d93F642f64180aa3", args)
    }
    log("----------------------------------------------------")
}

export default deployNftMarketplace
deployNftMarketplace.tags = ["all", "nftmarketplace"]
