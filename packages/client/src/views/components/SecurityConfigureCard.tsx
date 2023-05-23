import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../../MUDContext";
import { Entity, Has, getComponentValueStrict } from "@latticexyz/recs";
import { useState } from "react";
import { useGetEntityData } from "../../hooks/useGetEntityData";
import { ethers } from "ethers";

type TSecurityConfigureCard = {
  entity: Entity | undefined;
  principal: boolean;
  principalVal: string;
  setPrincipalVal: (val: string) => void;
  price: boolean;
  priceVal: string;
  setPriceVal: (val: string) => void;
  fxdRate: boolean;
  fxdRateVal: string;
  setFxdRateVal: (val: string) => void;
  fltRate: boolean;
  fltRateVal: string;
  setFltRateVal: (val: string) => void;
  expiry: boolean;
  expiryVal: string;
  setExpiryVal: (val: string) => void;
  frequency: boolean;
  frequencyVal: string;
  setFrequencyVal: (val: string) => void;
  strike: boolean;
  strikeVal: string;
  setStrikeVal: (val: string) => void;
};

const SecurityConfigureCard = ({
  entity,
  principal,
  principalVal,
  setPrincipalVal,
  price,
  priceVal,
  setPriceVal,
  fxdRate,
  fxdRateVal,
  setFxdRateVal,
  fltRate,
  fltRateVal,
  setFltRateVal,
  expiry,
  expiryVal,
  setExpiryVal,
  frequency,
  frequencyVal,
  setFrequencyVal,
  strike,
  strikeVal,
  setStrikeVal,
}: TSecurityConfigureCard) => {
  const [busy, setBusy] = useState(false);

  const truncateAddress = (str: string): string => {
    if (str.length > 10) {
      return str.slice(0, 6) + "..." + str.slice(-4);
    } else {
      return str;
    }
  };

  const {
    network: { world },
    systemCalls: { generateCompleteSecurity },
    components: { Base, Collateral, Security },
  } = useMUD();

  const handleSecuritize = async () => {
    if (!entity) return;
    await generateCompleteSecurity(
      entity,
      parseInt(principalVal),
      parseInt(priceVal),
      parseInt(fltRateVal),
      parseInt(fxdRateVal),
      parseInt(expiryVal),
      parseInt(frequencyVal),
      parseInt(strikeVal)
    );
  };

  const collateralised = useComponentValue(Collateral, entity)?.value;

  // Get characters owned by players
  const security = useEntityQuery([Has(Security)])
    .map((entity) => {
      return {
        entity: entity,
        security: getComponentValueStrict(Security, entity),
      };
    })
    .filter((securityInstance) => {
      let securityHex = ethers.utils.hexStripZeros(
        securityInstance.security.underlying
      );
      securityHex =
        securityHex.length < 4 ? "0x0" + securityHex.slice(2) : securityHex;
      return securityHex === entity;
    })
    .map((entity) => {
      return { entity: entity.entity, security: entity.security };
    })[0];

  const { getEntityData } = useGetEntityData();
  const entityData =
    security && getEntityData(world, security.entity, ["Owner", "Locked"]);

  const entityMap = entityData !== undefined ? entityData : [];

  if (collateralised) {
    return (
      <div className=" bg-white bg-opacity-25 w-72 h-96 rounded-md flex flex-col items-center">
        <p className="text-center p-2 font-thin text-xl">
          Securitization Details
        </p>
        <div className="flex flex-col ">
          {entityMap.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between pt-1"
            >
              <p className="font-thin text-sm pr-8">{`${item.name}:`}</p>
              <p className="font-light text-sm">{`${item.value}`}</p>
            </div>
          ))}
          <div className="flex flex-row items-center justify-between pt-1">
            <p className="font-thin text-sm pr-8">{`Writer:`}</p>
            <p className="font-light text-sm">{`${truncateAddress(
              security.security.writer
            )}`}</p>
          </div>
          <div className="flex flex-row items-center justify-between pt-1">
            <p className="font-thin text-sm pr-8">{`Holder:`}</p>
            <p className="font-light text-sm">{`${truncateAddress(
              security.security.holder
            )}`}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white bg-opacity-25 w-72 h-96 rounded-md flex flex-col items-center">
      <p className="text-center p-2 font-thin text-xl">Configure Components</p>
      <div className="flex flex-col justify-between h-full items-center">
        <div>
          {principal && (
            <div className="pb-2">
              <p className="text-sm text-left font-thin">Principal (ETH)</p>
              <input
                type="text"
                className="h-10 p-2 border border-gray-400 rounded-md w-60 bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                value={principalVal}
                onChange={(e) => setPrincipalVal(e.target.value)}
              />
            </div>
          )}
          {price && (
            <div className="pb-2">
              <p className="text-sm text-left font-thin">Price (ETH)</p>
              <input
                type="text"
                className="h-10 p-2 border border-gray-400 rounded-md w-60 bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                value={priceVal}
                onChange={(e) => setPriceVal(e.target.value)}
              />
            </div>
          )}
          {fltRate && (
            <div className="pb-2">
              <p className="text-sm text-left font-thin">Float Rate (bps)</p>
              <input
                type="text"
                className="h-10 p-2 border border-gray-400 rounded-md w-60 bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                value={fltRateVal}
                onChange={(e) => setFltRateVal(e.target.value)}
              />
            </div>
          )}
          {fxdRate && (
            <div className="pb-2">
              <p className="text-sm text-left font-thin">Fixed Rate (bps)</p>
              <input
                type="text"
                className="h-10 p-2 border border-gray-400 rounded-md w-60 bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                value={fxdRateVal}
                onChange={(e) => setFxdRateVal(e.target.value)}
              />
            </div>
          )}
          {expiry && (
            <div className="pb-2">
              <p className="text-sm text-left font-thin">
                Expiry (days from now)
              </p>
              <input
                type="text"
                className="h-10 p-2 border border-gray-400 rounded-md w-60 bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                value={expiryVal}
                onChange={(e) => setExpiryVal(e.target.value)}
              />
            </div>
          )}
          {frequency && (
            <div className="pb-2">
              <p className="text-sm text-left font-thin">Frequency (days)</p>
              <input
                type="text"
                className="h-10 p-2 border border-gray-400 rounded-md w-60 bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                value={frequencyVal}
                onChange={(e) => setFrequencyVal(e.target.value)}
              />
            </div>
          )}
          {strike && (
            <div className="">
              <p className="text-sm text-left font-thin">Strike (ETH)</p>
              <input
                type="text"
                className="h-10 p-2 border border-gray-400 rounded-md w-60 bg-white bg-opacity-80 text-gray-500 font-thin text-center focus:outline-0"
                value={strikeVal}
                onChange={(e) => setStrikeVal(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          disabled={busy || collateralised}
          className="outline outline-1 text-white text-sm font-light my-4 py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white "
          onClick={() => {
            handleSecuritize();
          }}
        >
          {collateralised ? "Securitized" : "Securitize"}
        </button>
      </div>
    </div>
  );
};

export default SecurityConfigureCard;
