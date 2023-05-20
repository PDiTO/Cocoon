import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },

    SecurityCounter: {
      keySchema: {},
      schema: "uint256",
    },

    Locked: {
      keySchema: {},
      schema: "bool",
    },

    Future: {
      keySchema: {},
      schema: {
        is: "bool",
        expiry: "uint256",
      },
    },

    Swap: {
      keySchema: {},
      schema: {
        is: "bool",
        rate: "uint256",
        index: "address",
        margin: "uint256",
        expiry: "uint256",
      },
    },

    Option: {
      keySchema: {},
      schema: {
        is: "bool",
        strike: "uint256",
        expiry: "uint256",
      },
    },
  },
});
