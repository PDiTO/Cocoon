import { Entity, getComponentValue } from "@latticexyz/recs";
import { useMUD } from "../../MUDContext";

import abi from "../../../../contracts/out/MUDToken.sol/MUDToken.abi.json";
import { useGetNFTData } from "../../hooks/useGetNFTData";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useComponentValue } from "@latticexyz/react";

type TTokenCard = {};

const TokenCard = ({}: TTokenCard) => {
  // State
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const [transferModalShown, setTransferModalShown] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [busy, setBusy] = useState(false);

  const {
    network: { world, network: networkNested, playerEntity, singletonEntity },
    systemCalls: { redeemEntity, worldTransferToken },
    components: { Factory },
  } = useMUD();

  console.log("DEL", playerEntity);

  const factoryAddress = useComponentValue(Factory, singletonEntity);

  const { getOwnedTokens, transferToken } = useGetNFTData(
    playerEntity as string,
    factoryAddress?.value,
    networkNested.signer.get()
  );

  const [tokens, setTokens] = useState<
    { id: BigNumber; uri: string }[] | undefined
  >([]);

  const updateTokens = async () => {
    const tokens = await getOwnedTokens();
    setTokens(tokens);
  };

  const sendToken = async () => {
    if (!selectedToken) return;
    setBusy(true);
    await transferToken(selectedToken?.id, receiverAddress);
    setReceiverAddress("");
    setTransferModalShown(false);
    setBusy(false);
  };

  const sendWorldToken = async () => {
    if (!selectedToken) return;
    setBusy(true);
    console.log("A");
    await worldTransferToken(selectedToken?.id, receiverAddress);
    console.log("B");
    setReceiverAddress("");
    setTransferModalShown(false);
    setBusy(false);
  };

  useEffect(() => {
    if (factoryAddress?.value) {
      updateTokens(); // to immediately load tokens

      const intervalId = setInterval(() => {
        updateTokens();
      }, 2000); // every 2 seconds for demo

      return () => clearInterval(intervalId); // clear on component unmount
    }
  }, [factoryAddress?.value]);

  const selectedToken =
    selectedIndex !== undefined && tokens !== undefined
      ? tokens[selectedIndex]
      : undefined;

  return (
    <div className=" bg-white bg-opacity-25 w-72 h-96 rounded-md flex flex-col items-center justify-between">
      <p className="text-center text-xl p-2 font-thin">Tokens (ERC721)</p>
      <div className="flex flex-col overflow-y-auto scroll-smooth no-scrollbar gap-2">
        {tokens?.map((token, index) => {
          const buttonClasses = `py-2 px-4 ${
            index === selectedIndex ? "bg-white bg-opacity-50 font-normal" : ""
          } font-thin hover:bg-white hover:bg-opacity-25 rounded-xl`;
          return (
            <button
              key={index}
              className={buttonClasses}
              onClick={() => setSelectedIndex(index)}
            >
              {token.id.toString().padStart(4, "0")}
            </button>
          );
        })}
      </div>

      <div className="flex flex-row gap-2">
        {!selectedToken ? (
          <button
            disabled
            className="outline outline-1 text-white text-sm font-light my-4 py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white"
          >
            IPFS
          </button>
        ) : (
          <a
            href={selectedToken.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="outline outline-1 text-white text-sm font-light my-4 py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white"
          >
            IPFS
          </a>
        )}
        <button
          disabled={!selectedToken}
          className="outline outline-1 text-white text-sm font-light my-4 py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white"
          onClick={() => {
            redeemEntity(selectedToken?.id.toNumber() ?? 0);
          }}
        >
          Redeem
        </button>
        <button
          disabled={!selectedToken}
          className="outline outline-1 text-white text-sm font-light my-4 py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white"
          onClick={() => {
            setTransferModalShown(!transferModalShown);
          }}
        >
          Transfer
        </button>
        <div className="flex flex-col items-center justify-center">
          {transferModalShown && (
            <div
              className="fixed z-10 inset-0 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity"
                  aria-hidden="true"
                ></div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="inline-block align-bottom bg-white bg-opacity-50 rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div className="flex flex-col">
                    <div className="">
                      <h3
                        className="text-lg leading-6 font-thin"
                        id="modal-title"
                      >
                        Enter Address
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="p-2 border border-gray-400 rounded-md w-full bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                          value={receiverAddress}
                          onChange={(e) => setReceiverAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 mt-5 sm:mt-4 items-center justify-center">
                    <button
                      disabled={busy}
                      type="button"
                      className="outline outline-1 text-white text-sm font-light  py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white"
                      onClick={() => setTransferModalShown(!transferModalShown)}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={busy}
                      type="button"
                      className="outline outline-1 text-white text-sm font-light  py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white"
                      //onClick={() => sendToken()}
                      onClick={() => sendWorldToken()}
                    >
                      {busy ? "Transferring" : "Transfer"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
