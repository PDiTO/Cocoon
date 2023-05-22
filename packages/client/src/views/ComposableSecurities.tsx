import {
  Entity,
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { useEffect, useState } from "react";

import { useNFTStorage } from "../hooks/useNFTStorage";
import { useGenerateNFTMetadata } from "../hooks/useGenerateNFTMetadata";
import LockClosed from "../assets/icons/LockClosed";
import LockOpen from "../assets/icons/LockOpen";
import { useGetNFTData } from "../hooks/useGetNFTData";
import EntityCard from "./components/EntityCard";
import EntityList from "./components/EntityList";
import TokenCard from "./components/TokenCard";

const ComposableSecurities = () => {
  // State
  const [selectedEntity, setSelectedEntity] = useState<number | undefined>(
    undefined
  );

  // Setup hooks
  const {
    network: { playerEntity, world, network: networkNested, singletonEntity },
    systemCalls: { createCharacter, tokenizeEntity, redeemEntity },
    components: {
      Character,
      Strength,
      Intelligence,
      Zen,
      Base,
      Locked,
      Factory,
    },
  } = useMUD();

  const factoryAddress = getComponentValue(Factory, singletonEntity);
  const { getOwnedTokens } = useGetNFTData(
    playerEntity as string,
    factoryAddress?.value,
    networkNested.signer.get()
  );

  // Get characters owned by players
  const characters = useEntityQuery([Has(Character)])
    .map((entity) => {
      return {
        entity: entity,
        character: getComponentValueStrict(Character, entity),
      };
    })
    .filter((character) => {
      return character.character.owner === playerEntity;
    })
    .map((entity) => {
      return entity.entity;
    });

  return (
    <section id="tokenize">
      <div className="flex flex-col  justify-center items-center h-screen text-white">
        <h1 className="text-4xl font-thin py-8">Composable Securities Demo</h1>
        <div className="grid grid-flow-row md:grid-cols-3 gap-8 items-center">
          <div className="col-span-1 text-center">A</div>
          <div className="col-span-1 text-center">B</div>
          <div className="col-span-1 text-center">C</div>
        </div>
        <div>
          <p className="font-thin text-xl pt-8">
            1. Added components need not to be limited to
          </p>
          <p className="font-thin text-xl pt-2">
            2. Create custom securities by a set of properties you define.
          </p>
          <p className="font-thin text-xl pt-2">
            3. Trade the ERC721 as you would any other token, on marketplaces
            such as Opensea or Blur
          </p>
          <p className="font-thin text-xl pt-2">
            4. The token owner can burn the ERC721 to unlock the MUD entity and
            redeem it into their own account
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComposableSecurities;
