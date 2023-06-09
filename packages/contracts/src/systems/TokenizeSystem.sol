// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Character, Factory, Locked } from "../codegen/Tables.sol";

import "../IMUDToken.sol";

contract TokenizeSystem is System {

    function tokenizeEntity(bytes32 _id, string calldata _uri) public {
        require(_msgSender() == Character.getOwner(_id), "Not owner of entity");
        require (Locked.get(_id) == false, "Entity already locked");

        // Set locked to true
        //Character.setOwner(_id, address(0));
        Locked.set(_id, true);

        // Mint token
        address mudAddress = Factory.get();
        IMUDToken mudToken = IMUDToken(mudAddress);
        mudToken.mint(_msgSender(), _id, _uri);
    }

    function redeemEntity(uint256 _tokenId) public {
        address mudAddress = Factory.get();
        IMUDToken mudToken = IMUDToken(mudAddress);
        bytes32 id = mudToken.burn(_msgSender(), _tokenId);
        Character.setOwner(id, _msgSender());
        Locked.set(id, false);
    }

    function worldTransferToken(uint256 _tokenId, address _to) public {
        address mudAddress = Factory.get();
        IMUDToken mudToken = IMUDToken(mudAddress);
        mudToken.worldTransfer(_msgSender(), _to, _tokenId);
    }

}
