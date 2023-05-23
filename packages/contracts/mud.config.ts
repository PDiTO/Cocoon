import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    // Character, an example of a typical game entity
    Character: {
      schema: {
        owner: "address",
        created: "uint256",
      },
    },

    // As above, but using character sec to give demo examples separate
    CharacterSec: {
      schema: {
        owner: "address",
        created: "uint256",
      },
    },

    Strength: "uint8",
    Intelligence: "uint8",
    Zen: "uint8",
    Special: "string",
    Base: "uint8",

    // Tokenize, locked assets should be blocked from being used
    Locked: "bool",
    Factory: { keySchema: {}, schema: "address" },

    ////////////////////////////
    // Composable Securities //
    ///////////////////////////

    Owner: "address", // The owner of an entity
    Security: {
      schema: {
        underlying: "bytes32",
        writer: "address", // Cannot be changed yet (would be v2)
        holder: "address", // Entered into the transaction, can be novated. This is empty until the security is committed.
      },
    },
    Collateral: "bool", // If an entity is being used as collateral
    Committed: "bool", // Security is now committed and can be entered
    Held: "bool", // Security now has a holder and is live, cannot be cancelled

    // Finacial Components
    Principal: "uint256",
    FixedRate: "uint256",
    FloatingRate: "uint256",
    Expiry: "uint256", // The date the agreement ends
    Price: "uint256", // A price required become the holder
    Strike: "uint256",
    Frequency: "uint256",
    FrequencyLastPaid: "uint256",
  },
  modules: [{ name: "UniqueEntityModule", root: true, args: [] }],
});
