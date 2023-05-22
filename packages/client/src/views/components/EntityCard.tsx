import { Entity } from "@latticexyz/recs";
import { useGetEntityData } from "../../hooks/useGetEntityData";
import { useMUD } from "../../MUDContext";
import getImageForBase from "../../utils/imageLookup";
import { useNFTStorage } from "../../hooks/useNFTStorage";
import { useGenerateNFTMetadata } from "../../hooks/useGenerateNFTMetadata";
import { useComponentValue } from "@latticexyz/react";
import { useState } from "react";
import LockClosed from "../../assets/icons/LockClosed";

type TEntityCard = {
  entity: Entity | undefined;
};

const EntityCard = ({ entity }: TEntityCard) => {
  const [NFTStorageBusy, setNFTStorageBusy] = useState(false);
  const [NFTMintingBusy, setNFTMintingBusy] = useState(false);

  const {
    network: { world },
    systemCalls: { tokenizeEntity },
    components: { Base, Locked },
  } = useMUD();

  const {
    uploadToNFTStorage,
    loading: nft_loading,
    error: nft_error,
  } = useNFTStorage();

  const { generateMetaData } = useGenerateNFTMetadata();

  const { getEntityData } = useGetEntityData();
  const entityData = entity && getEntityData(world, entity, ["Locked"]);
  const base = useComponentValue(Base, entity)?.value;
  const locked = useComponentValue(Locked, entity)?.value;

  const uploadMetaDataAndMint = async () => {
    if (!entityData) return;

    setNFTStorageBusy(true);
    const metadata = generateMetaData(world, entity, ["Locked"]);
    const base = metadata.find((property) => {
      return property?.trait_type === "Base";
    })?.value as number;

    const cid = await uploadToNFTStorage(
      "Collection",
      "Description",
      base ? getImageForBase(base) : "",
      metadata
    );
    setNFTMintingBusy(true);
    setNFTStorageBusy(false);
    await tokenizeEntity(entity, cid);
    setNFTMintingBusy(false);
  };

  return (
    <div className=" bg-white bg-opacity-25 w-72 h-96 rounded-md flex flex-col items-center justify-between">
      <p className="text-center p-2 font-thin text-xl">Selected Entity</p>
      <div className="pb-2" style={{ opacity: locked ? 1 : 0 }}>
        <LockClosed />
      </div>
      <div>
        {base ? (
          <div className="flex flex-col items-center">
            <img
              src={getImageForBase(base)}
              className="w-24 h-24 mb-4 text-center"
            />
          </div>
        ) : null}
        <div className="h-32">
          {entityData ? (
            entityData.map((entityField, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between pt-1"
                >
                  <p className="font-thin text-sm pr-8">{`${entityField.name}:`}</p>
                  <p className="font-light text-sm">{`${entityField.value}`}</p>
                </div>
              );
            })
          ) : (
            <div>
              <p className="text-center p-2 font-thin">Select an entity</p>
            </div>
          )}
        </div>
      </div>

      <button
        disabled={locked || NFTMintingBusy || NFTStorageBusy || !entity}
        className="outline outline-1 text-white text-sm font-light my-4 py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white "
        onClick={() => {
          uploadMetaDataAndMint();
        }}
      >
        {NFTStorageBusy
          ? "Uploading Metadata"
          : NFTMintingBusy
          ? "Minting ERC721"
          : locked
          ? "Minted"
          : "Tokenize"}
      </button>
    </div>
  );
};

export default EntityCard;
