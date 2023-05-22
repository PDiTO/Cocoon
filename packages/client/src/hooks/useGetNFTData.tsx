import { Provider } from "@ethersproject/providers";
import { NetworkConfig } from "@latticexyz/network";
import { Signer, ethers } from "ethers";

import abi from "../../../contracts/out/MUDToken.sol/MUDToken.abi.json";

export const useGetNFTData = (
  playerAddress: string | undefined,
  factoryAddress: string | undefined,
  provider: Signer | Provider | undefined
) => {
  async function getOwnedTokens() {
    if (!factoryAddress) return;

    const contract = new ethers.Contract(factoryAddress, abi, provider);

    // Get the amount of tokens owned by the address
    const balance = await contract.balanceOf(playerAddress);

    const ownedTokens: { id: ethers.BigNumber; uri: string }[] = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(playerAddress, i);
      const tokenUri = await contract.tokenURI(tokenId);
      ownedTokens.push({ id: tokenId, uri: tokenUri });
    }
    return ownedTokens;
  }

  return { getOwnedTokens };
};
