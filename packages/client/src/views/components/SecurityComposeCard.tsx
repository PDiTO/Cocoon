import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../../MUDContext";
import { useGetEntityData } from "../../hooks/useGetEntityData";
import getImageForBase from "../../utils/imageLookup";
import { Entity } from "@latticexyz/recs";
import LockClosed from "../../assets/icons/LockClosed";
import { useState } from "react";

type TSecurityComposeCard = {
  entity: Entity | undefined;
  principal: boolean;
  setPrincipal: (val: boolean) => void;
  price: boolean;
  setPrice: (val: boolean) => void;
  fxdRate: boolean;
  setFxdRate: (val: boolean) => void;
  fltRate: boolean;
  setFltRate: (val: boolean) => void;
  expiry: boolean;
  setExpiry: (val: boolean) => void;
  frequency: boolean;
  setFrequency: (val: boolean) => void;
  strike: boolean;
  setStrike: (val: boolean) => void;
};

const SecurityComposeCard = ({
  entity,
  principal,
  setPrincipal,
  price,
  setPrice,
  fxdRate,
  setFxdRate,
  fltRate,
  setFltRate,
  expiry,
  setExpiry,
  frequency,
  setFrequency,
  strike,
  setStrike,
}: TSecurityComposeCard) => {
  const [busy, setBusy] = useState(false);

  const {
    network: { world },
    systemCalls: { tokenizeEntity },
    components: { Base, Collateral },
  } = useMUD();

  const { getEntityData } = useGetEntityData();
  const entityData =
    entity && getEntityData(world, entity, ["Locked", "Collateral"]);
  const base = useComponentValue(Base, entity)?.value;
  const collateralised = useComponentValue(Collateral, entity)?.value;

  const basicButtonClasses = `py-2 px-4 font-thin hover:bg-white hover:bg-opacity-25 rounded-xl`;
  const selectedButtonClasses = `bg-white bg-opacity-50 font-normal`;

  return (
    <div className=" bg-white bg-opacity-25 w-72 h-96 rounded-md flex flex-col items-center justify-start">
      <p className="text-center p-2 font-thin text-xl">Select Components</p>

      <div className="flex flex-row pt-2">
        {base ? (
          <div className="flex flex-col items-center">
            <img src={getImageForBase(base)} className="h-24 text-center" />
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
      <div className="w-full border-b-2 border-white border-opacity-20 my-1 mx-3"></div>
      <div>
        {entity && !collateralised && (
          <div className="flex flex-col overflow-y-auto scroll-smooth no-scrollbar gap-2">
            <div className="grid grid-flow-row md:grid-cols-2 gap-2 items-center">
              <div className="col-span-1 w-28">
                <button
                  onClick={() => {
                    setPrincipal(!principal);
                  }}
                  className={`${basicButtonClasses} ${
                    principal ? selectedButtonClasses : ""
                  }`}
                >
                  Principal
                </button>
              </div>
              <div className="col-span-1 w-28">
                <button
                  onClick={() => {
                    setPrice(!price);
                  }}
                  className={`${basicButtonClasses} ${
                    price ? selectedButtonClasses : ""
                  }`}
                >
                  Price
                </button>
              </div>

              <div className="col-span-1 w-28">
                <button
                  onClick={() => {
                    setFltRate(!fltRate);
                  }}
                  className={`${basicButtonClasses} ${
                    fltRate ? selectedButtonClasses : ""
                  }`}
                >
                  Float Rate
                </button>
              </div>
              <div className="col-span-1 w-28">
                <button
                  onClick={() => {
                    setFxdRate(!fxdRate);
                  }}
                  className={`${basicButtonClasses} ${
                    fxdRate ? selectedButtonClasses : ""
                  }`}
                >
                  Fixed Rate
                </button>
              </div>
              <div className="col-span-1 w-28">
                <button
                  onClick={() => {
                    setExpiry(!expiry);
                  }}
                  className={`${basicButtonClasses} ${
                    expiry ? selectedButtonClasses : ""
                  }`}
                >
                  Expiry
                </button>
              </div>
              <div className="col-span-1 w-28">
                <button
                  onClick={() => {
                    setFrequency(!frequency);
                  }}
                  className={`${basicButtonClasses} ${
                    frequency ? selectedButtonClasses : ""
                  }`}
                >
                  Frequency
                </button>
              </div>
              <div className="col-span-1 w-28">
                <button
                  onClick={() => {
                    setStrike(!strike);
                  }}
                  className={`${basicButtonClasses} ${
                    strike ? selectedButtonClasses : ""
                  }`}
                >
                  Strike
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {entity && collateralised && (
          <div className="mt-20 font-thin">Already securitised</div>
        )}{" "}
      </div>
    </div>
  );
};

export default SecurityComposeCard;
