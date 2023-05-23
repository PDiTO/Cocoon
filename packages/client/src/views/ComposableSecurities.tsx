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
import SecurityComposeCard from "./components/SecurityComposeCard";
import SecurityConfigureCard from "./components/SecurityConfigureCard";

const ComposableSecurities = () => {
  // State
  const [selectedEntity, setSelectedEntity] = useState<number | undefined>(
    undefined
  );

  // Principle
  const [principal, setPrincipal] = useState(false);
  const [principalVal, setPrincipalVal] = useState("0");

  // Price
  const [price, setPrice] = useState(false);
  const [priceVal, setPriceVal] = useState("0");

  // Fixed Rate
  const [fxdRate, setFxdRate] = useState(false);
  const [fxdRateVal, setFxdRateVal] = useState("0");

  // Float Rate
  const [fltRate, setFltRate] = useState(false);
  const [fltRateVal, setFltRateVal] = useState("0");

  // Expiry
  const [expiry, setExpiry] = useState(false);
  const [expiryVal, setExpiryVal] = useState("0");

  // Frequency
  const [frequency, setFrequency] = useState(false);
  const [frequencyVal, setFrequencyVal] = useState("0");

  // Strike
  const [strike, setStrike] = useState(false);
  const [strikeVal, setStrikeVal] = useState("0");

  const {
    network: { playerEntity },
    components: { CharacterSec },
  } = useMUD();

  // Get characters owned by players
  const characters = useEntityQuery([Has(CharacterSec)])
    .map((entity) => {
      return {
        entity: entity,
        character: getComponentValueStrict(CharacterSec, entity),
      };
    })
    .filter((character) => {
      return character.character.owner === playerEntity;
    })
    .map((entity) => {
      return entity.entity;
    });

  return (
    <section id="compose">
      <div className="flex flex-col  justify-center items-center h-screen text-white">
        <h1 className="text-4xl font-thin pb-10">Composable Securities Demo</h1>
        <div className="grid grid-flow-row md:grid-cols-3 gap-8 items-center">
          <div className="col-span-1 text-center">
            <EntityList
              entities={characters}
              selectedIndex={selectedEntity}
              onEntitySelected={setSelectedEntity}
              secDemo={true}
            />
          </div>
          <div className="col-span-1 text-center">
            <SecurityComposeCard
              entity={
                selectedEntity !== undefined
                  ? characters[selectedEntity]
                  : undefined
              }
              principal={principal}
              setPrincipal={setPrincipal}
              price={price}
              setPrice={setPrice}
              fxdRate={fxdRate}
              setFxdRate={setFxdRate}
              fltRate={fltRate}
              setFltRate={setFltRate}
              expiry={expiry}
              setExpiry={setExpiry}
              frequency={frequency}
              setFrequency={setFrequency}
              strike={strike}
              setStrike={setStrike}
            />
          </div>
          <div className="col-span-1 text-center">
            <SecurityConfigureCard
              entity={
                selectedEntity !== undefined
                  ? characters[selectedEntity]
                  : undefined
              }
              principal={principal}
              principalVal={principalVal}
              setPrincipalVal={setPrincipalVal}
              price={price}
              priceVal={priceVal}
              setPriceVal={setPriceVal}
              fxdRate={fxdRate}
              fxdRateVal={fxdRateVal}
              setFxdRateVal={setFxdRateVal}
              fltRate={fltRate}
              fltRateVal={fltRateVal}
              setFltRateVal={setFltRateVal}
              expiry={expiry}
              expiryVal={expiryVal}
              setExpiryVal={setExpiryVal}
              frequency={frequency}
              frequencyVal={frequencyVal}
              setFrequencyVal={setFrequencyVal}
              strike={strike}
              strikeVal={strikeVal}
              setStrikeVal={setStrikeVal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComposableSecurities;
