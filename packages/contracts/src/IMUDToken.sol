    
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IMUDToken  {
    function mint(address _to, bytes32 _entityId, string memory _uri) external returns (uint256 id);
    function burn(address _sender, uint256 _tokenId) external returns (bytes32 id);
    function worldTransfer(address _from, address _to, uint256 _tokenId) external;
 }
