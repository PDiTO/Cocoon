// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MUDToken is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {

    address public originalWorld;
    uint256 public tokenCounter;

    mapping(uint256 => bytes32) tokenToEntity;

    constructor(string memory _name, string memory _ticker, address _world) ERC721(_name, _ticker) {
        originalWorld = _world;
        _transferOwnership(_world);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    function mint(address to, string memory uri)
        public onlyOwner() returns (uint256)
    {
        tokenCounter++;
        _safeMint(to, tokenCounter);
        _setTokenURI(tokenCounter, uri);

        return tokenCounter;
    }

    function burn(address _sender, uint256 _tokenId) public onlyOwner() returns (bytes32 entityId) {
        require(_sender == ownerOf(_tokenId), "Not token owner");
        _burn(_tokenId);
        entityId = tokenToEntity[_tokenId];
        delete tokenToEntity[_tokenId];
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}