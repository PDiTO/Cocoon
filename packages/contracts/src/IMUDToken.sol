    
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IMUDToken  {
    function mint(address to, string memory uri) external returns (uint256 id);
    function burn(address _sender, uint256 _tokenId) external returns (bytes32 id);
 }
