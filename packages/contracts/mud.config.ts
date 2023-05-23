import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },

    // Character, an example of a typical game entity
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

    // Tokenize, locked assets should be blocked from being used
    Locked: "bool",
    Factory: { keySchema: {}, schema: "address" },

    // Composable Securities
    Loan: {
      keySchema: {},
      schema: {
        rate: "uint256",
        expiry: "uint256",
      },
    },

    Future: {
      keySchema: {},
      schema: {
        price: "uint256",
        expiry: "uint256",
      },
    },

    Swap: {
      keySchema: {},
      schema: {
        rate: "uint256",
        index: "address",
        margin: "uint256",
        expiry: "uint256",
      },
    },

    Option: {
      keySchema: {},
      schema: {
        strike: "uint256",
        expiry: "uint256",
      },
    },
  },
  modules: [{ name: "UniqueEntityModule", root: true, args: [] }],
});
