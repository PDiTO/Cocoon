import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

const entityToBytes32 = (entity: string) => {
  return "0x" + entity.replace("0x", "").padStart(64, "0");
};

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const createCharacter = async () => {
    const tx = await worldSend("createCharacter", []);
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

  return {
    increment,
    createCharacter,
    tokenizeEntity,
    redeemEntity,
  };
}
