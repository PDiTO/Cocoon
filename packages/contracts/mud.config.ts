import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },

    // Character Example
    Character: {
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

    // Tokenize
    Locked: "bool",
    Factory: { keySchema: {}, schema: "address" },

    // Composable Securities

    Future: {
      keySchema: {},
      schema: {
        exists: "bool",
        expiry: "uint256",
      },
    },

    Swap: {
      keySchema: {},
      schema: {
        exists: "bool",
        rate: "uint256",
        index: "address",
        margin: "uint256",
        expiry: "uint256",
      },
    },

    Option: {
      keySchema: {},
      schema: {
        exists: "bool",
        strike: "uint256",
        expiry: "uint256",
      },
    },
  },
  modules: [{ name: "UniqueEntityModule", root: true, args: [] }],
});
