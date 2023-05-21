import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },

    // General
    OwnerTable: {
      keySchema: { token: "uint256" },
      schema: { owner: "address" },
    },

    // Tokenized Components

    TokenCounter: {
      keySchema: {},
      schema: "uint256",
    },

    Owner: {
      keySchema: { tokenId: "uint256" },
      schema: { owner: "address" },
    },

    Locked: {
      keySchema: { tokenId: "uint256" },
      schema: "bool",
    },

    // Composable Securities

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
