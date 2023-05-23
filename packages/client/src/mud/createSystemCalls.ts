import { awaitStreamValue } from "@latticexyz/utils";
import { SetupNetworkResult } from "./setupNetwork";
import { BigNumber } from "ethers";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

const entityToBytes32 = (entity: string) => {
  return "0x" + entity.replace("0x", "").padStart(64, "0");
};

export function createSystemCalls({
  worldSend,
  txReduced$,
  singletonEntity,
}: SetupNetworkResult) {
  const createCharacter = async () => {
    const tx = await worldSend("createCharacter", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const createCharacterSec = async () => {
    const tx = await worldSend("createCharacterSec", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const tokenizeEntity = async (id: string, uri: string) => {
    const tx = await worldSend("tokenizeEntity", [entityToBytes32(id), uri]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const redeemEntity = async (tokenId: number) => {
    const tx = await worldSend("redeemEntity", [tokenId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const worldTransferToken = async (tokenId: BigNumber, to: string) => {
    const tx = await worldSend("worldTransferToken", [tokenId, to]);
    // await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const generateCompleteSecurity = async (
    underlyingId: string,
    principal: number,
    price: number,
    floatRate: number,
    fixedRate: number,
    expiry: number,
    frequency: number,
    strike: number
  ) => {
    const tx = await worldSend("generateCompleteSecurity", [
      entityToBytes32(underlyingId),
      principal,
      price,
      floatRate,
      fixedRate,
      expiry,
      frequency,
      strike,
    ]);
  };

  return {
    createCharacter,
    createCharacterSec,
    tokenizeEntity,
    redeemEntity,
    worldTransferToken,
    generateCompleteSecurity,
  };
}
