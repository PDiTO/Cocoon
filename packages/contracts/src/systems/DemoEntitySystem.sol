// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { Character, CharacterData, CharacterSec, CharacterSecData, Strength, Intelligence, Zen, Base, Locked, Special, Collateral} from "../codegen/Tables.sol";

contract DemoEntitySystem is System {

    // Use to lock functions which shouldnt be accessible on locked entities
    modifier notLocked(bytes32 _id) {
        require(!Locked.get(_id), "Locked, cannot be used.");
        _;
    }

    // Use to lock functions which shouldnt be accessible on collateralised entities
    modifier notCollateal(bytes32 _id) {
        require(!Collateral.get(_id), "Collateral, cannot be changed in this way.");
        _;
    }

    // Creates a random character entity demo
  function createCharacter() public returns (bytes32 id) {
    id = getUniqueEntity();
    Character.set(id, CharacterData({owner: _msgSender(), created: block.timestamp}));

    uint256 fakeRand = uint256(keccak256(abi.encodePacked(block.number, block.timestamp, id)));

    uint8 strength = 1 + uint8((fakeRand % 1000) / 100);
    uint8 intellegence = 1 + uint8((fakeRand % 10000) / 1000);
    uint8 zen = 1 + uint8((fakeRand % 1000000) / 100000);
    
    uint8 base = uint8(fakeRand % 2) + 1;

    Strength.set(id, strength);
    Intelligence.set(id, intellegence);
    Zen.set(id, zen);
    Base.set(id, base);

    if (fakeRand % 5 <= 2) {
        Special.set(id, "Magic");
    }  
    
    Locked.set(id, false);
  }

      // Creates a random character entity demo
  function createCharacterSec() public returns (bytes32 id) {
    id = getUniqueEntity();
    CharacterSec.set(id, CharacterSecData({owner: _msgSender(), created: block.timestamp}));

    uint256 fakeRand = uint256(keccak256(abi.encodePacked(block.number, block.timestamp, id)));

    uint8 strength = 1 + uint8((fakeRand % 1000) / 100);
    uint8 intellegence = 1 + uint8((fakeRand % 10000) / 1000);
    uint8 zen = 1 + uint8((fakeRand % 1000000) / 100000);
    
    uint8 base = uint8(fakeRand % 2) + 1;

    Strength.set(id, strength);
    Intelligence.set(id, intellegence);
    Zen.set(id, zen);
    Base.set(id, base);

    if (fakeRand % 5 <= 2) {
        Special.set(id, "Magic");
    }  
    
    Locked.set(id, false);
  }
}
