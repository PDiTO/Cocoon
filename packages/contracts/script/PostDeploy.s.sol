// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Factory } from "../src/codegen/tables/Factory.sol";

// Custom
import "../src/MUDToken.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    // Start broadcasting transactions from the deployer account
    vm.startBroadcast(deployerPrivateKey);

    // Deploy and then set NFT contract here using a system address
    MUDToken mudToken = new MUDToken("","", worldAddress);

    // Store address
    IWorld world = IWorld(worldAddress);
    Factory.set(world, address(mudToken));

    vm.stopBroadcast();
  }
}
