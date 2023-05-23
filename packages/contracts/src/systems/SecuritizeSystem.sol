// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { Factory, Locked, Security, Collateral, Held, Owner, Committed, Expiry, Principal, Price, FixedRate, FloatingRate, Frequency, FrequencyLastPaid ,Strike} from "../codegen/Tables.sol";

contract SecuritizeSystem is System {

    // For sake a speed (hackathon and demo, we batch this up, but it should be separate as below)
    function generateCompleteSecurity(bytes32 _underlyingId, uint256 _principal, uint256 _price, uint256 _floatRate, uint256 _fixedRate, uint256 _expiry, uint256 _frequency, uint256 _strike) 
    public returns (bytes32 secId) {
        secId = generateSecurity(_underlyingId);

        if (_principal > 0) {
            addPrincipal(secId, _principal);
        }

        if (_price > 0) {
            addPrice(secId, _price);
        }

        if (_floatRate > 0) {
            addFloatingRate(secId, _floatRate);
        }

        if (_fixedRate > 0) {
            addFixedRate(secId, _fixedRate);
        }

        if (_expiry > 0) {
            addExpiry(secId, _expiry);
        }

        if (_frequency > 0) {
            addFrequency(secId, _frequency);
        }

        if (_strike > 0) {
            addStrike(secId, _strike);
        }

        commitSecurity(secId);
    }

    // Creates a security based on provided properties, 
    function generateSecurity(bytes32 _underlyingId) public returns (bytes32 id) {
        // Security id
        id = getUniqueEntity();

        // Set up security
        Security.setWriter(id, _msgSender());
        Security.setHolder(id, address(0));
        Security.setUnderlying(id, _underlyingId);
        Owner.set(id, _msgSender()); // Ownership can be transferred
    }

    // Configuration complete, commit security to finalise
    function commitSecurity(bytes32 _id) public {
        // Must be writer of security
        require(Security.getWriter(_id) == _msgSender(), "Not writer of security");

        // Get underlying
        bytes32 collateral = Security.getUnderlying(_id);

        // Collateralise underlying asset
        require(Collateral.get(collateral) == false, "Already securitised");
        Collateral.set(collateral, true);

    }

    // Become the counterparty to the security
    function enterSecurity(bytes32 _id) public {
        require(Held.get(_id) == false, "Already has a holder");
        Held.set(_id, true);

        // Set holder
        Security.setHolder(_id, _msgSender());
    }

    // Unwind a security that has not been entered
    function unwindSecurity(bytes32 _id) public {
        // Check requirements for unwind
        require(Held.get(_id) == false, "Already has a holder");
        require(Owner.get(_id) == _msgSender(), "Not owner");
        require(Security.getWriter(_id) == _msgSender(), "Not original writer.");

        bytes32 collateral = Security.getUnderlying(_id);

        Owner.deleteRecord(_id); // Remove
        Collateral.deleteRecord(collateral); // Unwind collateral
        Security.deleteRecord(_id); // Delete security

        // Other properties can remain or be cleaned up

    }
    
    // Properties to be set
    modifier securitySetup(bytes32 _id) {
        require(Committed.get(_id) == false, "Already securitised");
        require(Security.getWriter(_id) == _msgSender(), "Not writer");
        _;
    }

    function addPrincipal(bytes32 _id, uint256 _principal) public securitySetup(_id) {
        Principal.set(_id, _principal);
    }

    function addPrice(bytes32 _id, uint256 _price) public securitySetup(_id) {
        Price.set(_id, _price);
    }

    // _rate in basis points
    function addFixedRate(bytes32 _id, uint256 _rate) public securitySetup(_id) {
        FixedRate.set(_id, _rate);
    }

    // _rate in basis points
    function addFloatingRate(bytes32 _id, uint256 _rate) public securitySetup(_id) {
        FloatingRate.set(_id, _rate);
    }

    function addExpiry(bytes32 _id, uint256 _fromNow) public securitySetup(_id) {
        Expiry.set(_id, block.timestamp + _fromNow);
    }

    function addFrequency(bytes32 _id, uint256 _frequency) public securitySetup(_id) {
        Frequency.set(_id, _frequency);
    }

    function addStrike(bytes32 _id, uint256 _strike) public securitySetup(_id) {
        Strike.set(_id, _strike);
    }

}