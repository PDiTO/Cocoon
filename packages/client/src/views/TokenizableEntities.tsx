import {
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { useState } from "react";

import base0 from "../assets/sprites/base0.gif";
import base1 from "../assets/sprites/base1.gif";

import { useNFTStorage } from "../hooks/useNFTStorage";
import { useGenerateNFTMetadata } from "../hooks/useGenerateNFTMetadata";
import LockClosed from "../assets/icons/LockClosed";
import LockOpen from "../assets/icons/LockOpen";
import { useGetNFTData } from "../hooks/useGetNFTData";

const imageMap: { [key: number]: string } = {
  0: base0,
  1: base1,
};

// [
//   {
//     trait_type: "Strength",
//     value: characterDetails.strength,
//   },
//   {
//     trait_type: "Intelligence",
//     value: characterDetails.intelligence,
//   },
//   {
//     trait_type: "Zen",
//     value: characterDetails.zen,
//   },
//   {
//     display_type: "number",
//     trait_type: "Base",
//     value: characterDetails.base,
//   },
// ],

const TokenizableEntities = () => {
  const {
    network: { playerEntity, world, network: n2, singletonEntity },
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

  const {
    uploadToNFTStorage,
    loading: nft_loading,
    error: nft_error,
  } = useNFTStorage();

  const { generateMetaData, getImageUrl } = useGenerateNFTMetadata();

  const factoryAddress = getComponentValue(Factory, singletonEntity);
  const { getOwnedTokens } = useGetNFTData(
    playerEntity as string,
    factoryAddress?.value,
    n2.signer.get()
  );

  const characterEntities = useEntityQuery([Has(Character)]);

  const characters = characterEntities.map((entity) => {
    return {
      entity: entity,
      character: getComponentValueStrict(Character, entity),
    };
  });

  const playerCharacters = characters.filter((character) => {
    return character.character.owner === playerEntity;
  });

  const latestCharacter = playerCharacters.sort((a, b) => {
    if (a.character.created < b.character.created) return 1;
    if (a.character.created > b.character.created) return -1;
    return 0;
  })[0];

  const characterDetails = latestCharacter && {
    id: latestCharacter.entity,
    owner: latestCharacter.character.owner,
    created: latestCharacter.character.created,
    strength: getComponentValueStrict(Strength, latestCharacter.entity).value,
    intelligence: getComponentValueStrict(Intelligence, latestCharacter.entity)
      .value,
    zen: getComponentValueStrict(Zen, latestCharacter.entity).value,
    base: getComponentValueStrict(Base, latestCharacter.entity).value,
    locked: getComponentValueStrict(Locked, latestCharacter.entity).value,
  };

  const uploadMetaDataAndMint = async () => {
    if (!latestCharacter) return;

    const metadata = generateMetaData(world, latestCharacter.entity, [
      "Locked",
    ]);
    const base = metadata.find((property) => {
      return property?.trait_type === "Base";
    })?.value as number;

    const cid = await uploadToNFTStorage(
      "Collection",
      "Description",
      base ? getImageUrl(base) : "",
      metadata
    );

    await tokenizeEntity(latestCharacter.entity, cid);

    // const tokens = await getOwnedTokens();
    // console.log("YA", tokens);
  };

  return (
    <section id="tokenize">
      <div className="flex flex-col  justify-center items-center h-screen text-white">
        <h1 className="text-4xl font-thin py-4">Tokenizable Entities Demo</h1>
        <div className="grid grid-flow-row md:grid-cols-4 gap-8 items-center">
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-72 rounded-md flex flex-col items-center justify-between">
            <p className="text-center p-2 font-thin">Generate Entity</p>

            {characterDetails && (
              <div className="flex flex-col">
                <img
                  src={imageMap[characterDetails.base]}
                  className="w-24 h-24 mb-1"
                />
                <div className="text-white flex items-center justify-center">
                  {characterDetails.locked ? <LockClosed /> : <LockOpen />}
                </div>

                <p className="text-center mb-1">{characterDetails.id}</p>
                <div className="flex flex-row items-center justify-between">
                  <p className="font-light text-sm">Strength</p>
                  <p className="font-light text-sm">
                    {characterDetails.strength}
                  </p>
                </div>

                <div className="flex flex-row items-center justify-between">
                  <p className="font-light text-sm">Intelligence</p>
                  <p className="font-light text-sm">
                    {characterDetails.intelligence}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p className="font-light text-sm">Zen</p>
                  <p className="font-light text-sm">{characterDetails.zen}</p>
                </div>
              </div>
            )}
            <button
              className="outline outline-1 text-white text-xs font-light my-4 py-1 px-2 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:outline-white"
              onClick={() => {
                createCharacter();
              }}
            >
              Generate
            </button>
          </div>
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-72 rounded-md">
            <p className="text-center p-2 font-thin">Tokenize Entity</p>
            <button
              className="outline outline-1 text-white text-xs font-light my-4 py-1 px-2 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:outline-white"
              onClick={() => {
                uploadMetaDataAndMint();
              }}
            >
              Tokenize
            </button>
          </div>
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-80 rounded-md">
            <p className="text-center p-2 font-thin">Transfer</p>
            <button
              className="outline outline-1 text-white text-xs font-light my-4 py-1 px-2 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:outline-white"
              onClick={() => {}}
            >
              Test
            </button>
          </div>
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-72 rounded-md">
            <p className="text-center p-2 font-thin">Redeem</p>
            <button
              className="outline outline-1 text-white text-xs font-light my-4 py-1 px-2 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:outline-white"
              onClick={() => {
                redeemEntity();
              }}
            >
              Redeem
            </button>
          </div>
        </div>
        <div>
          <p className="font-thin text-xl pt-6">
            1. Generate a character entity in MUD
          </p>
        </div>
      </div>
    </section>
  );
};

export default TokenizableEntities;
