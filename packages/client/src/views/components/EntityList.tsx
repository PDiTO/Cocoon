import { Entity } from "@latticexyz/recs";
import { useMUD } from "../../MUDContext";
import { useState } from "react";

type TEntityList = {
  entities: Entity[];
  selectedIndex: number | undefined;
  onEntitySelected: (index: number) => void;
};

const EntityList = ({
  entities,
  selectedIndex,
  onEntitySelected,
}: TEntityList) => {
  const [busy, setBusy] = useState(false);

  const {
    systemCalls: { createCharacter },
    components: {},
  } = useMUD();

  const generateNew = async () => {
    setBusy(true);
    await createCharacter();
    setBusy(false);
  };

  return (
    <div className=" bg-white bg-opacity-25 w-72 h-96 rounded-md flex flex-col items-center justify-between">
      <p className="text-center p-2 font-thin text-xl">
        Select Entity or Generate
      </p>

      <div className="flex flex-col overflow-y-auto scroll-smooth no-scrollbar gap-2">
        {entities.map((entity, index) => {
          const buttonClasses = `py-2 px-4 ${
            index === selectedIndex ? "bg-white bg-opacity-50 font-normal" : ""
          } font-thin hover:bg-white hover:bg-opacity-25 rounded-xl`;
          return (
            <button
              key={index}
              className={buttonClasses}
              onClick={() => onEntitySelected(index)}
            >
              {entity}
            </button>
          );
        })}
      </div>

      <button
        disabled={busy}
        className="outline outline-1 text-white text-sm font-light my-4 py-2 px-4 rounded-lg uppercase disabled:opacity-40 enabled:hover:bg-white enabled:hover:text-slate-700 enabled:hover:outline-white "
        onClick={() => {
          generateNew();
        }}
      >
        {busy ? "Generating" : "Generate New"}
      </button>
    </div>
  );
};

export default EntityList;
