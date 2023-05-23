// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { Factory, Locked} from "../codegen/Tables.sol";

contract SecuritizeSystem is System {

    // Creates a security based on provided properties
  function generateSecurity() public returns (bytes32 id) {
    id = getUniqueEntity();
    
    Locked.set(id, false);
  }
}