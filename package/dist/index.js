"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AddAdminForm: () => AddAdminForm,
  ListTokenForm: () => ListTokenForm,
  SelectTokenContainer: () => SelectTokenContainer,
  SelectTokenModal: () => Kit_default,
  TokenKitWrapper: () => wrapper_default,
  TokensTable: () => TokensTable_default,
  UpdateAdminForm: () => UpdateAdminForm,
  UpdateTokenForm: () => UpdateTokenForm,
  bigintToLongAddress: () => bigintToLongAddress,
  bigintToShortStr: () => bigintToShortStr,
  convertToReadableTokens: () => convertToReadableTokens,
  limitChars: () => limitChars,
  useTokenKitContext: () => useTokenKitContext
});
module.exports = __toCommonJS(src_exports);

// src/wrapper.tsx
var import_react3 = __toESM(require("react"));
var import_core2 = require("@mantine/core");
var import_modals2 = require("@mantine/modals");
var import_notifications = require("@mantine/notifications");

// src/providers/tokenkitprovider.tsx
var import_react2 = __toESM(require("react"));
var import_starknet2 = require("starknet");
var import_starknetkit = require("starknetkit");

// src/configs/utils.ts
var import_bignumber = require("bignumber.js");

// src/assets/token_kit_abi.json
var token_kit_abi_default = [
  {
    type: "impl",
    name: "TokenRegImpl",
    interface_name: "tokenreg::interface::ITokenReg"
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "tokenreg::models::Token",
    members: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "icon",
        type: "core::felt252"
      },
      {
        name: "name",
        type: "core::felt252"
      },
      {
        name: "symbol",
        type: "core::felt252"
      },
      {
        name: "decimals",
        type: "core::integer::u8"
      },
      {
        name: "verified",
        type: "core::bool"
      },
      {
        name: "public",
        type: "core::bool"
      },
      {
        name: "common",
        type: "core::bool"
      },
      {
        name: "pair_id",
        type: "core::felt252"
      }
    ]
  },
  {
    type: "struct",
    name: "tokenreg::models::Admin",
    members: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "amount",
        type: "core::integer::u256"
      }
    ]
  },
  {
    type: "interface",
    name: "tokenreg::interface::ITokenReg",
    items: [
      {
        type: "function",
        name: "add_token",
        inputs: [
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "icon_link",
            type: "core::felt252"
          },
          {
            name: "pair_id",
            type: "core::felt252"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "edit_token",
        inputs: [
          {
            name: "token_index",
            type: "core::integer::u256"
          },
          {
            name: "public",
            type: "core::bool"
          },
          {
            name: "verified",
            type: "core::bool"
          },
          {
            name: "common",
            type: "core::bool"
          },
          {
            name: "icon_link",
            type: "core::felt252"
          },
          {
            name: "pair_id",
            type: "core::felt252"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "add_admin",
        inputs: [
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "get_tokens",
        inputs: [
          {
            name: "page",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::array::Array::<tokenreg::models::Token>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_admins",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<tokenreg::models::Admin>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_tokens_count",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_has_upgraded",
        inputs: [],
        outputs: [
          {
            type: "core::felt252"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_tokens_version",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "verify_token",
        inputs: [
          {
            name: "token_index",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "withdraw_token",
        inputs: [
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "InternalImpl",
    interface_name: "tokenreg::interface::IInternal"
  },
  {
    type: "interface",
    name: "tokenreg::interface::IInternal",
    items: [
      {
        type: "function",
        name: "edit_fee_token",
        inputs: [
          {
            name: "token_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "edit_verification_fee",
        inputs: [
          {
            name: "fee",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "get_revenue",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "impl",
    name: "UpgradeableContract",
    interface_name: "tokenreg::upgrade::IUpgradeableContract"
  },
  {
    type: "interface",
    name: "tokenreg::upgrade::IUpgradeableContract",
    items: [
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "impl_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "version",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "guardian",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "event",
    name: "tokenreg::tokensreg::TokenReg::Upgraded",
    kind: "struct",
    members: [
      {
        name: "implementation",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "tokenreg::tokensreg::TokenReg::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "tokenreg::tokensreg::TokenReg::Upgraded",
        kind: "nested"
      }
    ]
  }
];

// src/configs/utils.ts
var import_starknet = require("starknet");

// src/assets/pragmaabi.json
var pragmaabi_default = [
  {
    type: "impl",
    name: "IOracleImpl",
    interface_name: "pragma::oracle::oracle::IOracleABI"
  },
  {
    type: "enum",
    name: "pragma::entry::structs::DataType",
    variants: [
      {
        name: "SpotEntry",
        type: "core::felt252"
      },
      {
        name: "FutureEntry",
        type: "(core::felt252, core::integer::u64)"
      },
      {
        name: "GenericEntry",
        type: "core::felt252"
      }
    ]
  },
  {
    type: "enum",
    name: "core::option::Option::<core::integer::u64>",
    variants: [
      {
        name: "Some",
        type: "core::integer::u64"
      },
      {
        name: "None",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::PragmaPricesResponse",
    members: [
      {
        name: "price",
        type: "core::integer::u128"
      },
      {
        name: "decimals",
        type: "core::integer::u32"
      },
      {
        name: "last_updated_timestamp",
        type: "core::integer::u64"
      },
      {
        name: "num_sources_aggregated",
        type: "core::integer::u32"
      },
      {
        name: "expiration_timestamp",
        type: "core::option::Option::<core::integer::u64>"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    type: "enum",
    name: "pragma::entry::structs::AggregationMode",
    variants: [
      {
        name: "Median",
        type: "()"
      },
      {
        name: "Mean",
        type: "()"
      },
      {
        name: "Error",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<pragma::entry::structs::DataType>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::DataType>"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<pragma::entry::structs::PragmaPricesResponse>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::PragmaPricesResponse>"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::BaseEntry",
    members: [
      {
        name: "timestamp",
        type: "core::integer::u64"
      },
      {
        name: "source",
        type: "core::felt252"
      },
      {
        name: "publisher",
        type: "core::felt252"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::SpotEntry",
    members: [
      {
        name: "base",
        type: "pragma::entry::structs::BaseEntry"
      },
      {
        name: "price",
        type: "core::integer::u128"
      },
      {
        name: "pair_id",
        type: "core::felt252"
      },
      {
        name: "volume",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::FutureEntry",
    members: [
      {
        name: "base",
        type: "pragma::entry::structs::BaseEntry"
      },
      {
        name: "price",
        type: "core::integer::u128"
      },
      {
        name: "pair_id",
        type: "core::felt252"
      },
      {
        name: "volume",
        type: "core::integer::u128"
      },
      {
        name: "expiration_timestamp",
        type: "core::integer::u64"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::GenericEntry",
    members: [
      {
        name: "base",
        type: "pragma::entry::structs::BaseEntry"
      },
      {
        name: "key",
        type: "core::felt252"
      },
      {
        name: "value",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "enum",
    name: "pragma::entry::structs::PossibleEntries",
    variants: [
      {
        name: "Spot",
        type: "pragma::entry::structs::SpotEntry"
      },
      {
        name: "Future",
        type: "pragma::entry::structs::FutureEntry"
      },
      {
        name: "Generic",
        type: "pragma::entry::structs::GenericEntry"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<pragma::entry::structs::PossibleEntries>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::PossibleEntries>"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::Checkpoint",
    members: [
      {
        name: "timestamp",
        type: "core::integer::u64"
      },
      {
        name: "value",
        type: "core::integer::u128"
      },
      {
        name: "aggregation_mode",
        type: "pragma::entry::structs::AggregationMode"
      },
      {
        name: "num_sources_aggregated",
        type: "core::integer::u32"
      }
    ]
  },
  {
    type: "enum",
    name: "pragma::entry::structs::SimpleDataType",
    variants: [
      {
        name: "SpotEntry",
        type: "()"
      },
      {
        name: "FutureEntry",
        type: "()"
      }
    ]
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::Currency",
    members: [
      {
        name: "id",
        type: "core::felt252"
      },
      {
        name: "decimals",
        type: "core::integer::u32"
      },
      {
        name: "is_abstract_currency",
        type: "core::bool"
      },
      {
        name: "starknet_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "ethereum_address",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "struct",
    name: "pragma::entry::structs::Pair",
    members: [
      {
        name: "id",
        type: "core::felt252"
      },
      {
        name: "quote_currency_id",
        type: "core::felt252"
      },
      {
        name: "base_currency_id",
        type: "core::felt252"
      }
    ]
  },
  {
    type: "interface",
    name: "pragma::oracle::oracle::IOracleABI",
    items: [
      {
        type: "function",
        name: "get_decimals",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          }
        ],
        outputs: [
          {
            type: "core::integer::u32"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_median",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_median_for_sources",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_median_multi",
        inputs: [
          {
            name: "data_types",
            type: "core::array::Span::<pragma::entry::structs::DataType>"
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<pragma::entry::structs::PragmaPricesResponse>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_entry",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "source",
            type: "core::felt252"
          },
          {
            name: "publisher",
            type: "core::felt252"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PossibleEntries"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_entry_for_publishers",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "source",
            type: "core::felt252"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PossibleEntries"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_for_sources",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_entries",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<pragma::entry::structs::PossibleEntries>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_entries_for_sources",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>"
          }
        ],
        outputs: [
          {
            type: "(core::array::Span::<pragma::entry::structs::PossibleEntries>, core::integer::u64)"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_last_checkpoint_before",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "timestamp",
            type: "core::integer::u64"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          }
        ],
        outputs: [
          {
            type: "(pragma::entry::structs::Checkpoint, core::integer::u64)"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_data_with_USD_hop",
        inputs: [
          {
            name: "base_currency_id",
            type: "core::felt252"
          },
          {
            name: "quote_currency_id",
            type: "core::felt252"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          },
          {
            name: "typeof",
            type: "pragma::entry::structs::SimpleDataType"
          },
          {
            name: "expiration_timestamp",
            type: "core::option::Option::<core::integer::u64>"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_publisher_registry_address",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_latest_checkpoint_index",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::bool)"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_latest_checkpoint",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::Checkpoint"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_checkpoint",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "checkpoint_index",
            type: "core::integer::u64"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          }
        ],
        outputs: [
          {
            type: "pragma::entry::structs::Checkpoint"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_sources_threshold",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_admin_address",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_all_publishers",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<core::felt252>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_all_sources",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<core::felt252>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "publish_data",
        inputs: [
          {
            name: "new_entry",
            type: "pragma::entry::structs::PossibleEntries"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "publish_data_entries",
        inputs: [
          {
            name: "new_entries",
            type: "core::array::Span::<pragma::entry::structs::PossibleEntries>"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_admin_address",
        inputs: [
          {
            name: "new_admin_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "update_publisher_registry_address",
        inputs: [
          {
            name: "new_publisher_registry_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "add_currency",
        inputs: [
          {
            name: "new_currency",
            type: "pragma::entry::structs::Currency"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "update_currency",
        inputs: [
          {
            name: "currency_id",
            type: "core::felt252"
          },
          {
            name: "currency",
            type: "pragma::entry::structs::Currency"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "add_pair",
        inputs: [
          {
            name: "new_pair",
            type: "pragma::entry::structs::Pair"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_checkpoint",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_checkpoints",
        inputs: [
          {
            name: "data_types",
            type: "core::array::Span::<pragma::entry::structs::DataType>"
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "remove_source",
        inputs: [
          {
            name: "source",
            type: "core::felt252"
          },
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_sources_threshold",
        inputs: [
          {
            name: "threshold",
            type: "core::integer::u32"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "impl_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<pragma::entry::structs::Currency>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::Currency>"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<pragma::entry::structs::Pair>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::Pair>"
      }
    ]
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "admin_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "publisher_registry_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "currencies",
        type: "core::array::Span::<pragma::entry::structs::Currency>"
      },
      {
        name: "pairs",
        type: "core::array::Span::<pragma::entry::structs::Pair>"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::UpdatedPublisherRegistryAddress",
    kind: "struct",
    members: [
      {
        name: "old_publisher_registry_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      },
      {
        name: "new_publisher_registry_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::SubmittedSpotEntry",
    kind: "struct",
    members: [
      {
        name: "spot_entry",
        type: "pragma::entry::structs::SpotEntry",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::SubmittedFutureEntry",
    kind: "struct",
    members: [
      {
        name: "future_entry",
        type: "pragma::entry::structs::FutureEntry",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::SubmittedGenericEntry",
    kind: "struct",
    members: [
      {
        name: "generic_entry",
        type: "pragma::entry::structs::GenericEntry",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::SubmittedCurrency",
    kind: "struct",
    members: [
      {
        name: "currency",
        type: "pragma::entry::structs::Currency",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::UpdatedCurrency",
    kind: "struct",
    members: [
      {
        name: "currency",
        type: "pragma::entry::structs::Currency",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::SubmittedPair",
    kind: "struct",
    members: [
      {
        name: "pair",
        type: "pragma::entry::structs::Pair",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::CheckpointSpotEntry",
    kind: "struct",
    members: [
      {
        name: "pair_id",
        type: "core::felt252",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::CheckpointFutureEntry",
    kind: "struct",
    members: [
      {
        name: "pair_id",
        type: "core::felt252",
        kind: "data"
      },
      {
        name: "expiration_timestamp",
        type: "core::integer::u64",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::ChangedAdmin",
    kind: "struct",
    members: [
      {
        name: "new_admin",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "pragma::oracle::oracle::Oracle::Event",
    kind: "enum",
    variants: [
      {
        name: "UpdatedPublisherRegistryAddress",
        type: "pragma::oracle::oracle::Oracle::UpdatedPublisherRegistryAddress",
        kind: "nested"
      },
      {
        name: "SubmittedSpotEntry",
        type: "pragma::oracle::oracle::Oracle::SubmittedSpotEntry",
        kind: "nested"
      },
      {
        name: "SubmittedFutureEntry",
        type: "pragma::oracle::oracle::Oracle::SubmittedFutureEntry",
        kind: "nested"
      },
      {
        name: "SubmittedGenericEntry",
        type: "pragma::oracle::oracle::Oracle::SubmittedGenericEntry",
        kind: "nested"
      },
      {
        name: "SubmittedCurrency",
        type: "pragma::oracle::oracle::Oracle::SubmittedCurrency",
        kind: "nested"
      },
      {
        name: "UpdatedCurrency",
        type: "pragma::oracle::oracle::Oracle::UpdatedCurrency",
        kind: "nested"
      },
      {
        name: "SubmittedPair",
        type: "pragma::oracle::oracle::Oracle::SubmittedPair",
        kind: "nested"
      },
      {
        name: "CheckpointSpotEntry",
        type: "pragma::oracle::oracle::Oracle::CheckpointSpotEntry",
        kind: "nested"
      },
      {
        name: "CheckpointFutureEntry",
        type: "pragma::oracle::oracle::Oracle::CheckpointFutureEntry",
        kind: "nested"
      },
      {
        name: "ChangedAdmin",
        type: "pragma::oracle::oracle::Oracle::ChangedAdmin",
        kind: "nested"
      }
    ]
  }
];

// src/assets/ERC_20_ABI.json
var ERC_20_ABI_default = [
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ],
    outputs: [
      {
        type: "core::integer::u256"
      }
    ],
    state_mutability: "view"
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "amount",
        type: "core::integer::u256"
      }
    ],
    outputs: [],
    state_mutability: "external"
  },
  {
    type: "function",
    name: "transfer_from",
    inputs: [
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "amount",
        type: "core::integer::u256"
      }
    ],
    outputs: [],
    state_mutability: "external"
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "amount",
        type: "core::integer::u256"
      }
    ],
    outputs: [],
    state_mutability: "external"
  },
  {
    type: "function",
    name: "increase_allowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "added_value",
        type: "core::integer::u256"
      }
    ],
    outputs: [],
    state_mutability: "external"
  },
  {
    type: "function",
    name: "decrease_allowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "subtracted_value",
        type: "core::integer::u256"
      }
    ],
    outputs: [],
    state_mutability: "external"
  }
];

// src/configs/utils.ts
var TOKEN_KIT_ABI = token_kit_abi_default;
var TOKEN_KIT_CONTRACT_ADDRESS_TESTNET = "0x72fccd711f5a27e50b48d56514717847b45ab3620a517cd9cad61ded3b5895d";
var TOKEN_KIT_CONTRACT_ADDRESS_MAINNET = "0x72fccd711f5a27e50b48d56514717847b45ab3620a517cd9cad61ded3b5895d";
var PRAGMA_ABI = pragmaabi_default;
var PRAGMA_CONTRACT_ADDRESS_TESTNET = "0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167";
var PRAGMA_CONTRACT_ADDRESS_MAINNET = "0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b";
var ERC20_ABI = ERC_20_ABI_default;
var USDC_ADDRESS_TESTNET = "0x5a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426";
var USDC_ADDRESS_MAINNET = "0x53C91253BC9682c04929cA02ED00b3E423f6710D2ee7e0D5EBB06F3eCF368A8";
function formatNumberInternational(number) {
  const DECIMALS = 4;
  if (typeof Intl.NumberFormat === "function") {
    const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: DECIMALS, maximumFractionDigits: DECIMALS });
    return formatter.format(number);
  } else {
    console.warn("Intl.NumberFormat is not supported in this browser. Fallback may not provide accurate formatting.");
    return number.toLocaleString("en-US");
  }
}
function bigintToShortStr(bigintstr) {
  try {
    if (!bigintstr)
      return "";
    const bn = (0, import_bignumber.BigNumber)(bigintstr);
    const hex_sentence = `0x` + bn.toString(16);
    return import_starknet.shortString.decodeShortString(hex_sentence);
  } catch (error) {
    return bigintstr;
  }
}
function bigintToLongAddress(bigintstr) {
  try {
    if (!bigintstr)
      return "";
    const bn = (0, import_bignumber.BigNumber)(bigintstr);
    const hex_sentence = `0x` + bn.toString(16);
    return hex_sentence;
  } catch (error) {
    return bigintstr;
  }
}
function convertToReadableTokens(tokens, decimals) {
  if (!tokens || !decimals)
    return "";
  return new import_bignumber.BigNumber(tokens).dividedBy(10 ** decimals).toNumber().toFixed(6);
}
var removeTrailingZeros = (tokenAddress) => {
  if (tokenAddress.length > 4) {
    const res = "0x" + tokenAddress.substring(2).replace(/^0+/, "");
    return res;
  }
  return tokenAddress;
};
function limitChars(str, count, show_dots) {
  if (count <= str?.length) {
    return `${str.substring(0, count)} ${show_dots ? "..." : ""}`;
  }
  return str;
}
function timeStampToDate(timestamp) {
  if (!timestamp)
    return null;
  const timestampInMilliseconds = timestamp * 1e3;
  const date = new Date(timestampInMilliseconds);
  return date;
}
function getRealPrice(val) {
  let decimals = (0, import_bignumber.BigNumber)(val.decimals).toNumber();
  let ts = (0, import_bignumber.BigNumber)(val.last_updated_timestamp).toNumber();
  let real_price = {
    price: (0, import_bignumber.BigNumber)(val.price).dividedBy(10 ** decimals).toNumber(),
    last_updated_timestamp: timeStampToDate(ts),
    num_sources_aggregated: (0, import_bignumber.BigNumber)(val.num_sources_aggregated).toNumber()
  };
  return real_price;
}

// src/providers/tokenkitprovider.tsx
var import_modals = require("@mantine/modals");
var import_core = require("@mantine/core");
var import_bignumber2 = __toESM(require("bignumber.js"));

// src/configs/db.ts
var import_dexie = __toESM(require("dexie"));
var TokenKitDBDexie = class extends import_dexie.default {
  tokens;
  info;
  mainnet_tokens;
  mainnet_info;
  constructor() {
    super("TokenKitDB");
    this.version(1).stores({
      tokens: "++id, name, symbol, decimals, address, verified, public"
    });
    this.version(2).stores({
      tokens: "++id, name, symbol, decimals, address, verified, public, common, pair_id, [verified+common], [verified+public], [verified+common+public]"
    });
    this.version(3).stores({
      info: "++id, name, tokens_count, tokens_version"
    });
    this.version(4).stores({
      mainnet_tokens: "++id, name, symbol, decimals, address, verified, public, common, pair_id, [verified+common], [verified+public], [verified+common+public]",
      mainnet_info: "++id, name, tokens_count, tokens_version"
    });
  }
};
var db = new TokenKitDBDexie();

// src/providers/providerUtils.ts
var import_react = require("react");
var initialData = {
  contract: null,
  pragma_contract: null,
  account: null,
  address: null,
  connection: null,
  handleConnetDisconnectWalletBtnClick: null,
  network: null,
  reloadTokensFromContract: null,
  loadingTokens: false,
  primaryColor: "blue"
};
var TokenKitContext = (0, import_react.createContext)(initialData);
var useTokenKitContext = () => {
  return (0, import_react.useContext)(TokenKitContext);
};

// src/providers/tokenkitprovider.tsx
var TokenKitProvider = ({ children, nodeUrl, network, primaryColor }) => {
  const [contract, setContract] = (0, import_react2.useState)();
  const [pragma_contract, setPragmaContract] = (0, import_react2.useState)();
  const [connection, setConnection] = (0, import_react2.useState)();
  const [account, setAccount] = (0, import_react2.useState)();
  const [address, setAddress] = (0, import_react2.useState)("");
  const [loading, setLoading] = (0, import_react2.useState)(false);
  const connectWallet = async () => {
    try {
      let provider = new import_starknet2.RpcProvider({ nodeUrl });
      const connection2 = await (0, import_starknetkit.connect)({
        webWalletUrl: "https://web.argent.xyz",
        dappName: "Token Kit",
        modalMode: "canAsk",
        provider
      });
      if (connection2 && connection2?.wallet) {
        setConnection(connection2);
        setAccount(connection2?.wallet?.account);
        setAddress(connection2?.wallet?.selectedAddress);
      }
    } catch (err) {
    }
  };
  const disconnectWallet = async () => {
    await (0, import_starknetkit.disconnect)({ clearLastWallet: true });
    setConnection(null);
    setAccount(null);
    setAddress("");
  };
  const openConfirmDisconnectModal = () => import_modals.modals.openConfirmModal({
    title: "You about to disconnect your wallet!",
    centered: true,
    radius: "md",
    children: /* @__PURE__ */ import_react2.default.createElement(import_core.Text, { size: "sm" }, "Are you sure you want to disconnect your account?"),
    labels: { confirm: "Disconnect", cancel: "Cancel" },
    confirmProps: { radius: "md", variant: "light" },
    cancelProps: { radius: "md", variant: "light" },
    onCancel: () => {
    },
    onConfirm: () => disconnectWallet()
  });
  const makeContractConnection = () => {
    try {
      if (network === "SN_GOERLI") {
        let provider = new import_starknet2.RpcProvider({ nodeUrl });
        let pragma_contract2 = new import_starknet2.Contract(PRAGMA_ABI, PRAGMA_CONTRACT_ADDRESS_TESTNET, provider);
        setPragmaContract(pragma_contract2);
        let contract2 = new import_starknet2.Contract(TOKEN_KIT_ABI, TOKEN_KIT_CONTRACT_ADDRESS_TESTNET, provider);
        if (account) {
          contract2 = new import_starknet2.Contract(TOKEN_KIT_ABI, TOKEN_KIT_CONTRACT_ADDRESS_TESTNET, account);
        }
        setContract(contract2);
      } else {
        let provider = new import_starknet2.RpcProvider({ nodeUrl });
        let pragma_contract2 = new import_starknet2.Contract(PRAGMA_ABI, PRAGMA_CONTRACT_ADDRESS_MAINNET, provider);
        setPragmaContract(pragma_contract2);
        let contract2 = new import_starknet2.Contract(TOKEN_KIT_ABI, TOKEN_KIT_CONTRACT_ADDRESS_MAINNET, provider);
        if (account) {
          contract2 = new import_starknet2.Contract(TOKEN_KIT_ABI, TOKEN_KIT_CONTRACT_ADDRESS_MAINNET, account);
        }
        setContract(contract2);
      }
    } catch (error) {
    }
  };
  const handleConnetDisconnectWalletBtnClick = () => {
    if (!account) {
      connectWallet();
    } else {
      openConfirmDisconnectModal();
    }
  };
  const loadTokens = async (page) => {
    try {
      const res = await contract.get_tokens(page);
      return res;
    } catch (error) {
      throw error;
    }
  };
  const formatToken = (token) => {
    const icon = bigintToShortStr(token?.icon);
    const formattedIcon = icon.startsWith("https://") || icon.startsWith("http://") ? icon : `https://${icon}`;
    const formated_token = {
      address: bigintToLongAddress(token?.address),
      name: bigintToShortStr(token?.name),
      symbol: bigintToShortStr(token?.symbol),
      decimals: new import_bignumber2.default(token?.decimals).toNumber(),
      icon: formattedIcon,
      verified: token?.verified,
      public: token?.public,
      common: token?.common,
      pair_id: bigintToShortStr(token?.pair_id)
    };
    return formated_token;
  };
  const actualLoadTokens = async (noOfTokens) => {
    try {
      setLoading(true);
      const totalPages = Math.ceil(noOfTokens / 25);
      const allTokens = await Promise.all(
        Array.from({ length: totalPages }, (_, index) => loadTokens(index + 1))
      );
      const combinedTokens = allTokens.flat().map((token, i) => {
        const formated_token = formatToken(token);
        return {
          id: i + 1,
          ...formated_token
        };
      });
      if (network === "SN_GOERLI") {
        db.tokens.clear();
        db.tokens.bulkPut(combinedTokens).then((res) => {
        }).catch((error) => {
        });
      }
      if (network === "SN_MAIN") {
        db.mainnet_tokens.clear();
        db.mainnet_tokens.bulkPut(combinedTokens).then((res) => {
        }).catch((error) => {
        });
      }
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const checkAndReloadTokensForVersion = async () => {
    try {
      if (contract) {
        const totalTokens = await contract.get_tokens_count();
        const totalTokensReadable = new import_bignumber2.default(totalTokens).toNumber();
        const tokens_version = await contract.get_tokens_version();
        const readable_tokens_version = new import_bignumber2.default(tokens_version).toNumber();
        if (network === "SN_GOERLI") {
          const info = await db.info.get(1);
          if (!info) {
            db.info.put({
              id: 1,
              tokens_count: totalTokensReadable,
              name: "main",
              tokens_version: readable_tokens_version
            });
            actualLoadTokens(totalTokensReadable);
          } else {
            if (info?.tokens_version !== readable_tokens_version) {
              actualLoadTokens(totalTokensReadable);
              db.info.put({
                id: 1,
                tokens_count: totalTokensReadable,
                name: "main",
                tokens_version: readable_tokens_version
              });
            }
          }
        }
        if (network === "SN_MAIN") {
          const mainnet_info = await db.mainnet_info.get(1);
          if (!mainnet_info) {
            db.mainnet_info.put({
              id: 1,
              tokens_count: totalTokensReadable,
              name: "main",
              tokens_version: readable_tokens_version
            });
            actualLoadTokens(totalTokensReadable);
          } else {
            if (mainnet_info?.tokens_version !== readable_tokens_version) {
              actualLoadTokens(totalTokensReadable);
              db.mainnet_info.put({
                id: 1,
                tokens_count: totalTokensReadable,
                name: "main",
                tokens_version: readable_tokens_version
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching contract tokens information:", error);
    }
  };
  const contextValue = (0, import_react2.useMemo)(() => ({
    contract,
    pragma_contract,
    account,
    address,
    connection,
    network,
    handleConnetDisconnectWalletBtnClick,
    reloadTokensFromContract: checkAndReloadTokensForVersion,
    loadingTokens: loading,
    primaryColor
  }), [account, contract, address, pragma_contract]);
  (0, import_react2.useEffect)(() => {
    makeContractConnection();
    checkAndReloadTokensForVersion();
  }, [account]);
  (0, import_react2.useEffect)(() => {
    checkAndReloadTokensForVersion();
  }, [contract]);
  (0, import_react2.useEffect)(() => {
    connectWallet();
  }, []);
  return /* @__PURE__ */ import_react2.default.createElement(TokenKitContext.Provider, { value: contextValue }, children);
};
var tokenkitprovider_default = TokenKitProvider;

// src/wrapper.tsx
var import_styles = require("@mantine/core/styles.css");
var import_styles2 = require("@mantine/notifications/styles.css");
var import_styles_layer = require("@mantine/core/styles.layer.css");
var import_styles_layer2 = require("mantine-datatable/styles.layer.css");
var TokenKitWrapper = (props) => {
  const { children, usingMantine, theme, primaryColor, network, nodeUrl } = props;
  if (usingMantine) {
    return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("div", { className: "tokenkit" }, /* @__PURE__ */ import_react3.default.createElement(
      import_core2.MantineProvider,
      {
        forceColorScheme: theme,
        theme: {
          primaryColor
        }
      },
      /* @__PURE__ */ import_react3.default.createElement(tokenkitprovider_default, { nodeUrl, network, primaryColor }, children)
    )));
  }
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "tokenkit" }, /* @__PURE__ */ import_react3.default.createElement(
    import_core2.MantineProvider,
    {
      forceColorScheme: theme,
      theme: {
        primaryColor
      }
    },
    /* @__PURE__ */ import_react3.default.createElement(import_modals2.ModalsProvider, null, /* @__PURE__ */ import_react3.default.createElement(import_notifications.Notifications, null), /* @__PURE__ */ import_react3.default.createElement(tokenkitprovider_default, { nodeUrl, network, primaryColor }, children))
  ));
};
var wrapper_default = TokenKitWrapper;

// src/components/Kit.tsx
var import_react4 = require("react");
var import_core3 = require("@mantine/core");
var import_react5 = __toESM(require("react"));
var import_starknet3 = require("starknet");
var import_icons_react = require("@tabler/icons-react");
var import_hooks = require("@mantine/hooks");
var import_modals3 = require("@mantine/modals");
var import_dexie_react_hooks = require("dexie-react-hooks");
var SelectTokenContainer = ({ modalHeight, selectedToken, callBackFunc, themeObject, close }) => {
  const { loadingTokens, network, primaryColor } = useTokenKitContext();
  const [totalTokens, setTotalTokens] = (0, import_react4.useState)(0);
  const [tokens, setTokens] = (0, import_react4.useState)([]);
  const [commonTokens, setCommonTokens] = (0, import_react4.useState)([]);
  const [searchedToken, setSearchedToken] = (0, import_hooks.useDebouncedState)("", 200);
  const [page, setPage] = (0, import_react4.useState)(1);
  const have_tokens_changed = (0, import_dexie_react_hooks.useLiveQuery)(() => db.tokens.toArray());
  const tokensPerPage = 25;
  const selectSingle = (token) => {
    callBackFunc && callBackFunc(token);
    close();
  };
  const loadCommonTokens = async () => {
    const common_tks = await db.tokens.filter((t) => (t.common ?? false) && (t.public ?? false)).toArray();
    setCommonTokens(common_tks);
  };
  const sortTokens = (tokens_to_sort) => {
    return tokens_to_sort.sort((a, b) => {
      if (a.verified && a.common && !b.verified) {
        return -1;
      } else if (a.verified && !a.common && !b.verified) {
        return -1;
      } else if (!a.verified && b.verified) {
        return 1;
      } else if (!a.verified && !b.verified) {
        return 1;
      } else {
        return a.common ? -1 : 1;
      }
    });
  };
  const loadTokensFromDB = async () => {
    const _totalTokens = await db.tokens.count();
    setTotalTokens(_totalTokens);
    const limit = tokensPerPage;
    const offset = (page - 1) * tokensPerPage;
    const trimmedSearchedToken = searchedToken.trim();
    const regex = new RegExp(`(${trimmedSearchedToken})`, "gi");
    const addressSearchTerm = removeTrailingZeros(trimmedSearchedToken);
    const addressRegex = new RegExp(`(${addressSearchTerm})`, "gi");
    const filteredTokens = await db.tokens.filter((token) => {
      const matched = token.symbol.match(regex) || token.name.match(regex) || removeTrailingZeros(token.address).match(addressRegex);
      return matched ? true : false;
    }).filter((token) => !!token.public).limit(limit).offset(offset).toArray();
    console.log("Filtered tokens: ", filteredTokens);
    const sortedTokens = sortTokens(filteredTokens);
    console.log("Sorted tokens: ", sortedTokens);
    setTokens(sortedTokens);
  };
  const HEADER_HEIGHT = 250;
  (0, import_react4.useEffect)(() => {
    loadCommonTokens();
  }, []);
  (0, import_react4.useEffect)(() => {
    loadTokensFromDB();
  }, [searchedToken, page, loadingTokens, have_tokens_changed]);
  return /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { style: {
    height: modalHeight ?? "90dvh",
    background: themeObject.modalBackground,
    borderRadius: "20px",
    overflow: "hidden"
  } }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { h: `${HEADER_HEIGHT}px`, style: {
    background: themeObject.headerFooterBackground
  } }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { p: "md", justify: "space-between", align: "center", className: "w-100" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Title, { order: 2, fw: 500, c: themeObject.textColor }, "Select Token"), /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, null, /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { py: "6px", px: "10px", style: {
    background: themeObject.tokenHoverColor,
    borderRadius: "10px"
  } }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { size: "xs", c: themeObject.textColor }, network === "SN_GOERLI" ? "Testnet" : null, network === "SN_MAIN" ? "Mainnet" : null)), /* @__PURE__ */ import_react5.default.createElement(import_core3.ActionIcon, { variant: "transparent", onClick: close }, /* @__PURE__ */ import_react5.default.createElement(import_icons_react.IconX, { color: themeObject.textColor })))), /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { px: "md", h: `${HEADER_HEIGHT}px` }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Stack, { h: `${HEADER_HEIGHT}px`, gap: 6 }, /* @__PURE__ */ import_react5.default.createElement(
    import_core3.Input,
    {
      type: "search",
      defaultValue: searchedToken,
      onChange: (e) => setSearchedToken(e.target.value),
      size: "md",
      radius: "lg",
      placeholder: "Search name, symbol or paste address",
      className: "w-100",
      mb: "md",
      styles: {
        input: {
          border: `2px solid ${themeObject.searchBorderColor}`,
          background: themeObject.searchBackgroundColor,
          accentColor: "red",
          "--_input-color": themeObject.searchTextColor
        }
      },
      rightSectionPointerEvents: "all"
    }
  ), /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { justify: "space-between", align: "center" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Title, { order: 5, mb: "xs", c: themeObject.textColor }, "Common tokens")), /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { style: { overflow: "hidden", maxWidth: "100%" } }, commonTokens?.length === 0 ? /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { fw: 500, ta: "center", c: themeObject.textColor }, "No common tokens.") : null, /* @__PURE__ */ import_react5.default.createElement(import_core3.ScrollArea, { scrollbarSize: 10, pb: "10px", type: "always" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { display: "flex", style: { flexWrap: "nowrap" }, p: "6px", gap: 10 }, commonTokens?.map((item, i) => /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { key: `token_s_${i}`, w: "fit-content" }, /* @__PURE__ */ import_react5.default.createElement(
    SelectTokenBtn,
    {
      token: item,
      select: selectSingle,
      selectedToken,
      themeObject
    }
  ))))))))), /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { style: {
    height: `calc(100% - ${HEADER_HEIGHT}px - 80px)`,
    background: themeObject.modalBackground
  } }, /* @__PURE__ */ import_react5.default.createElement(import_core3.ScrollArea, { className: "h-100" }, tokens?.length === 0 ? /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { h: 300 }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Center, { h: 300 }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { fw: 500, ta: "center", maw: "80%", c: themeObject.textColor }, "Tokens Not Found ", /* @__PURE__ */ import_react5.default.createElement(import_core3.Anchor, { href: "https://tokenkit-gamma.vercel.app/", c: primaryColor, target: "_blank" }, "list here.")))) : null, /* @__PURE__ */ import_react5.default.createElement(import_core3.Stack, { p: "xs", gap: 0 }, tokens?.map((item, i) => /* @__PURE__ */ import_react5.default.createElement(SelectToken, { key: `dfd_${i}`, token: item, select: selectSingle, selectedToken, themeObject }))))), /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { px: "md", style: (theme) => ({
    height: `80px`,
    background: themeObject.headerFooterBackground
  }) }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Stack, { className: "h-100", gap: 10, align: "center", justify: "center" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { w: "100%", align: "center", justify: "space-between" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Anchor, { href: "https://tokenkit-gamma.vercel.app/list-token", size: "xs", fw: 500, c: primaryColor }, "List New Token"), /* @__PURE__ */ import_react5.default.createElement(import_core3.Pagination, { variant: "light", value: page, radius: "md", onChange: setPage, total: Math.ceil(totalTokens / tokensPerPage), size: "sm" })), /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { size: "xs", ta: "center", maw: "60%" }, "Want to try Starknet Token Kit?", " ", /* @__PURE__ */ import_react5.default.createElement(import_core3.Anchor, { href: "https://tokenkit-gamma.vercel.app", c: primaryColor, size: "xs", fw: 500 }, "Check it out!"), "."))));
};
var SelectTokenModal = (props) => {
  const { children, themeObject } = props;
  const [opened, { open, close }] = (0, import_hooks.useDisclosure)(false);
  return /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement(import_core3.Box, { onClick: open }, children), /* @__PURE__ */ import_react5.default.createElement(
    import_core3.Modal,
    {
      bg: "transparent",
      lockScroll: true,
      c: themeObject.textColor,
      withinPortal: true,
      opened,
      zIndex: 1e5,
      styles: {
        content: {
          background: "transparent",
          overflow: "hidden"
        },
        header: {
          width: "100%"
        },
        title: {
          width: "100%"
        }
      },
      withCloseButton: false,
      size: "md",
      onClose: () => {
        close();
        import_modals3.modals.closeAll();
      },
      padding: 0,
      radius: "lg",
      title: null
    },
    /* @__PURE__ */ import_react5.default.createElement(SelectTokenContainer, { ...props, close })
  ));
};
var SelectToken = ({ token, select, selectedToken, themeObject }) => {
  const { pragma_contract } = useTokenKitContext();
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [tokenPrice, setTokenPrice] = (0, import_react4.useState)(null);
  const { hovered, ref } = (0, import_hooks.useHover)();
  const getTokenPrice = async () => {
  };
  const selectToken = () => {
    select({ ...token, price: tokenPrice });
  };
  const getImageUrl = () => {
    if (token?.verified && token?.common) {
      return {
        badge: "https://i.postimg.cc/Qx8RZ8qD/verified.png",
        msg: "Common & Verified"
      };
    } else if (token?.verified && !token?.common) {
      return {
        badge: "https://i.postimg.cc/d3BpZpwg/casual-life-3d-check-mark-side-view-pink.png",
        msg: "Verified"
      };
    }
    return null;
  };
  const has_changed = (0, import_react4.useMemo)(() => ({
    pragma_contract,
    selectedToken,
    token
  }), [pragma_contract, selectedToken, token]);
  (0, import_react4.useEffect)(() => {
    getTokenPrice();
  }, [has_changed]);
  return /* @__PURE__ */ import_react5.default.createElement(import_core3.Paper, { ref, py: "xs", radius: "md", px: "md", style: {
    background: hovered ? themeObject?.tokenHoverColor : `${selectedToken?.address === token?.address ? themeObject.tokenHoverColor : "transparent"}`,
    cursor: "pointer",
    pointerEvents: selectedToken?.address === token?.address ? "none" : "all"
  }, onClick: () => selectToken() }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { justify: "space-between", align: "center" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { align: "center" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Avatar, { size: "sm", src: token?.icon, variant: "light", bg: themeObject.tokenBackgroundColor, tt: "capitalize" }, limitChars(token?.symbol ?? "", 2, false)), /* @__PURE__ */ import_react5.default.createElement(import_core3.Stack, { gap: -10 }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { gap: 3 }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { size: "sm", c: themeObject.textColor }, token?.symbol), getImageUrl() ? /* @__PURE__ */ import_react5.default.createElement(import_core3.Tooltip, { label: getImageUrl()?.msg, position: "bottom" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Image, { src: getImageUrl()?.badge, h: "14px", w: "14px" })) : null), /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { size: "xs", fw: 300, c: themeObject.textColor }, token?.name))), loading ? /* @__PURE__ */ import_react5.default.createElement(import_core3.Skeleton, { height: 10, width: 40 }) : null, tokenPrice ? /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { size: "xs", fw: 300 }, "$", formatNumberInternational(tokenPrice?.price)) : null));
};
var SelectTokenBtn = ({ token, select, selectedToken, themeObject }) => {
  const { pragma_contract } = useTokenKitContext();
  const [tokenPrice, setTokenPrice] = (0, import_react4.useState)(null);
  const [_loading, setLoading] = (0, import_react4.useState)(false);
  const { hovered, ref } = (0, import_hooks.useHover)();
  const getTokenPrice = async () => {
    if (pragma_contract && token?.pair_id !== "-" && token?.pair_id !== "" && token?.pair_id !== "N/A") {
      const SPOTENTRY_ENUM = new import_starknet3.CairoCustomEnum({
        SpotEntry: token?.pair_id
      });
      setLoading(true);
      try {
        const res = await pragma_contract.get_data_median(SPOTENTRY_ENUM);
        const price = getRealPrice(res);
        setTokenPrice(price);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };
  const selectToken = () => {
    select({ ...token, price: tokenPrice });
  };
  (0, import_react4.useEffect)(() => {
    getTokenPrice();
  }, [pragma_contract, selectedToken]);
  return /* @__PURE__ */ import_react5.default.createElement(import_core3.Paper, { ref, py: "4px", px: "12px", style: {
    background: hovered ? themeObject.tokenHoverColor : `${selectedToken?.address === token?.address ? themeObject.tokenHoverColor : "transparent"}`,
    border: `2px solid ${themeObject.tokenHoverColor}`,
    borderRadius: "10px",
    pointerEvents: selectedToken?.address === token?.address ? "none" : "all",
    cursor: "pointer",
    width: "fit-content"
  }, onClick: () => selectToken() }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Group, { gap: 10, wrap: "nowrap" }, /* @__PURE__ */ import_react5.default.createElement(import_core3.Avatar, { size: "sm", src: token?.icon, bg: themeObject.tokenBackgroundColor, tt: "capitalize" }, limitChars(token?.symbol ?? "", 2, false)), /* @__PURE__ */ import_react5.default.createElement(import_core3.Text, { size: "sm", fw: 500, c: themeObject.textColor }, token?.symbol)));
};
var Kit_default = SelectTokenModal;

// src/components/TokensTable.tsx
var import_hooks2 = require("@mantine/hooks");
var import_react9 = __toESM(require("react"));
var import_core6 = require("@mantine/core");

// src/components/CustomCopyButton.tsx
var import_react6 = __toESM(require("react"));
var import_core4 = require("@mantine/core");
var import_icons_react2 = require("@tabler/icons-react");
var CustomCopyBtn = (props) => {
  const { color, copy_value } = props;
  return /* @__PURE__ */ import_react6.default.createElement(import_core4.CopyButton, { value: copy_value }, ({ copied, copy }) => /* @__PURE__ */ import_react6.default.createElement(import_core4.Tooltip, { label: copied ? "Copied" : "Copy" }, /* @__PURE__ */ import_react6.default.createElement(import_core4.ActionIcon, { variant: "light", size: "sm", radius: "sm", color: copied ? `${color}.9` : color, onClick: copy }, /* @__PURE__ */ import_react6.default.createElement(import_icons_react2.IconCopy, null))));
};
var CustomCopyButton_default = CustomCopyBtn;

// src/components/TokensTable.tsx
var import_icons_react4 = require("@tabler/icons-react");

// src/components/forms.tsx
var import_core5 = require("@mantine/core");
var import_form = require("@mantine/form");
var import_notifications2 = require("@mantine/notifications");
var import_icons_react3 = require("@tabler/icons-react");
var import_react7 = __toESM(require("react"));
var import_react8 = require("react");
var import_bignumber3 = __toESM(require("bignumber.js"));
var import_starknet4 = require("starknet");
var UpdateTokenForm = (props) => {
  const { data } = props;
  const { contract, reloadTokensFromContract } = useTokenKitContext();
  const [loading, setLoading] = (0, import_react8.useState)(false);
  const form = (0, import_form.useForm)({
    initialValues: {
      token_index: data?.id ?? "",
      public: data?.public ?? false,
      verified: data?.verified ?? false,
      common: data?.common ?? false,
      icon_link: data?.icon ?? "",
      pair_id: data?.pair_id ?? "-"
    },
    validate: {
      icon_link: (val) => val === "" ? "Icon link is required" : null
    }
  });
  const handleSubmit = () => {
    if (contract) {
      const call_data = form.values;
      call_data.icon_link = form.values.icon_link;
      const myCall = contract.populate("edit_token", call_data);
      contract.edit_token(myCall.calldata).then((_res) => {
        (0, import_notifications2.showNotification)({
          title: "Update",
          message: `Update Succesful`,
          color: "green",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconCheck, null)
        });
        reloadTokensFromContract && reloadTokensFromContract();
      }).catch((err) => {
        (0, import_notifications2.showNotification)({
          title: "Update failed",
          message: `${err}`,
          color: "red",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconAlertTriangle, null)
        });
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  return /* @__PURE__ */ import_react7.default.createElement("form", { onSubmit: form.onSubmit((_values) => handleSubmit()) }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Stack, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Title, { order: 3 }, "Update Token"), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.NumberInput, { disabled: true, label: "Token Index", placeholder: "Token Index", radius: "md", ...form.getInputProps("token_index") })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.TextInput, { label: "Pair ID", placeholder: "ETH/USD", radius: "md", ...form.getInputProps("pair_id") })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 4 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Switch, { label: "Common", radius: "md", ...form.getInputProps("common", { type: "checkbox" }) })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 4 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Switch, { label: "Public", radius: "md", ...form.getInputProps("public", { type: "checkbox" }) })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 4 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Switch, { label: "Verified", radius: "md", ...form.getInputProps("verified", { type: "checkbox" }) })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.TextInput, { label: "Icon Link", placeholder: "https://shortlink/xysx", radius: "md", ...form.getInputProps("icon_link"), maxLength: 29 })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Button, { radius: "md", type: "submit", leftSection: loading ? /* @__PURE__ */ import_react7.default.createElement(import_core5.Loader, { size: "sm", color: "white" }) : /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconWriting, { size: "18px" }), rightSection: loading ? /* @__PURE__ */ import_react7.default.createElement(import_core5.Loader, { color: "white", size: "sm" }) : null }, "Update Token")))));
};
var ListTokenForm = () => {
  const [loading, setLoading] = (0, import_react8.useState)(false);
  const { contract, reloadTokensFromContract } = useTokenKitContext();
  const form = (0, import_form.useForm)({
    initialValues: {
      address: "",
      icon_link: "",
      pair_id: "-"
    },
    validate: {
      address: (val) => val === "" ? "Token Address is required" : null,
      icon_link: (val) => val === "" ? "Icon link is required" : null
    }
  });
  const handleSubmit = () => {
    if (contract) {
      const call_data = form.values;
      call_data.icon_link = form.values.icon_link;
      const myCall = contract.populate("add_token", call_data);
      contract.add_token(myCall.calldata).then((_res) => {
        (0, import_notifications2.showNotification)({
          title: "Token Listing",
          message: `Token Added Succesfully`,
          color: "green",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconCheck, null)
        });
        reloadTokensFromContract && reloadTokensFromContract();
      }).catch((err) => {
        (0, import_notifications2.showNotification)({
          title: "Token listing failed",
          message: `${err}`,
          color: "red",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconAlertTriangle, null)
        });
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  return /* @__PURE__ */ import_react7.default.createElement("form", { onSubmit: form.onSubmit((_values) => handleSubmit()) }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Stack, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Title, { order: 3 }, "List new Token"), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.TextInput, { label: "Token Address", placeholder: "Token Address", radius: "md", ...form.getInputProps("address") })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.TextInput, { label: "Pair ID", placeholder: "ETH/USD", radius: "md", ...form.getInputProps("pair_id") })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.TextInput, { label: "Icon Link", placeholder: "https://shortlink/xysx", ...form.getInputProps("icon_link"), maxLength: 29, radius: "md" })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Button, { radius: "md", type: "submit", leftSection: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconUpload, { size: "18px" }), rightSection: loading ? /* @__PURE__ */ import_react7.default.createElement(import_core5.Loader, { color: "white", size: "sm" }) : null }, "List Token")))));
};
var VerifyTokenBtn = (props) => {
  const [loading, setLoading] = (0, import_react8.useState)(false);
  const { token_index } = props;
  const { contract, network, account } = useTokenKitContext();
  const form = (0, import_form.useForm)({
    initialValues: {
      address: "",
      icon_link: "",
      pair_id: "-"
    },
    validate: {
      address: (val) => val === "" ? "Token Address is required" : null,
      icon_link: (val) => val === "" ? "Icon link is required" : null
    }
  });
  const handleVerify = async () => {
    if (contract) {
      let amt = (0, import_bignumber3.default)(5e6).toNumber();
      let ERC_ADDRESS = USDC_ADDRESS_TESTNET;
      let CONTRACT_ADDRESS = TOKEN_KIT_CONTRACT_ADDRESS_TESTNET;
      if (network === "SN_MAIN") {
        ERC_ADDRESS = USDC_ADDRESS_MAINNET;
        CONTRACT_ADDRESS = TOKEN_KIT_CONTRACT_ADDRESS_MAINNET;
      }
      const ERC20contract = new import_starknet4.Contract(ERC20_ABI, ERC_ADDRESS, account);
      const erc20Call = ERC20contract.populate("approve", [CONTRACT_ADDRESS, amt]);
      const calldata = [token_index];
      const myCall = contract.populate("verify_token", calldata);
      const multiCall = await account.execute(
        [
          {
            contractAddress: ERC_ADDRESS,
            entrypoint: "approve",
            calldata: erc20Call.calldata
          },
          {
            contractAddress: CONTRACT_ADDRESS,
            entrypoint: "verify_token",
            calldata: myCall.calldata
          }
        ]
      );
      account?.provider.waitForTransaction(multiCall.transaction_hash).then(() => {
        (0, import_notifications2.showNotification)({
          title: "Success",
          message: "Token verified!!",
          color: "green",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconInfoCircle, { stroke: 1.5 })
        });
      }).catch((e) => {
        console.log("Error: ", e);
        (0, import_notifications2.showNotification)({
          title: "Failure",
          message: "Token verification failed!!",
          color: "red",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconAlertTriangle, { stroke: 1.5 })
        });
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  return /* @__PURE__ */ import_react7.default.createElement(import_core5.ActionIcon, { onClick: () => handleVerify(), loading }, /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconWriting, null));
};
var AddAdminForm = () => {
  const [loading, setLoading] = (0, import_react8.useState)(false);
  const { contract } = useTokenKitContext();
  const form = (0, import_form.useForm)({
    initialValues: {
      address: ""
    },
    validate: {
      address: (val) => val === "" ? "Admin Address is required" : null
    }
  });
  const handleSubmit = () => {
    if (contract) {
      const call_data = form.values;
      const myCall = contract.populate("add_admin", call_data);
      contract.add_admin(myCall.calldata).then((_res) => {
        (0, import_notifications2.showNotification)({
          title: "New Admin",
          message: `Admin Added Successfully`,
          color: "green",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconCheck, null)
        });
      }).catch((err) => {
        (0, import_notifications2.showNotification)({
          title: "Adding failed",
          message: `${err}`,
          color: "red",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconAlertTriangle, null)
        });
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  return /* @__PURE__ */ import_react7.default.createElement("form", { onSubmit: form.onSubmit((_values) => handleSubmit()) }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Stack, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Title, { order: 3 }, "Add New Admin"), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.TextInput, { label: "Admin Address", placeholder: "Admin Address", radius: "md", ...form.getInputProps("address") })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Button, { radius: "md", type: "submit", leftSection: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconUpload, { size: "18px" }), rightSection: loading ? /* @__PURE__ */ import_react7.default.createElement(import_core5.Loader, { color: "white", size: "sm" }) : null }, "Add Admin")))));
};
var UpdateAdminForm = (props) => {
  const { data } = props;
  const [loading, setLoading] = (0, import_react8.useState)(false);
  const { contract } = useTokenKitContext();
  const form = (0, import_form.useForm)({
    initialValues: {
      address: data?.address ?? "",
      has_permission: data?.has_permission ?? false
    },
    validate: {
      address: (val) => val === "" ? "Admin Address is required" : null
    }
  });
  const handleSubmit = () => {
    if (contract) {
      const call_data = form.values;
      const myCall = contract.populate("add_admin", call_data);
      contract.add_admin(myCall.calldata).then((_res) => {
        (0, import_notifications2.showNotification)({
          title: "New Admin",
          message: `Admin Updated Successfully`,
          color: "green",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconCheck, null)
        });
      }).catch((err) => {
        (0, import_notifications2.showNotification)({
          title: "Update failed",
          message: `${err}`,
          color: "red",
          icon: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconAlertTriangle, null)
        });
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  return /* @__PURE__ */ import_react7.default.createElement("form", { onSubmit: form.onSubmit((_values) => handleSubmit()) }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Stack, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Title, { order: 3 }, "Update Admin"), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid, null, /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.TextInput, { label: "Admin Address", disabled: true, placeholder: "Admin Address", radius: "md", ...form.getInputProps("address") })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 4 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Switch, { label: "Has Admin Permissions", radius: "md", ...form.getInputProps("has_permission", { type: "checkbox" }) })), /* @__PURE__ */ import_react7.default.createElement(import_core5.Grid.Col, { span: { md: 12 } }, /* @__PURE__ */ import_react7.default.createElement(import_core5.Button, { radius: "md", type: "submit", leftSection: /* @__PURE__ */ import_react7.default.createElement(import_icons_react3.IconUpload, { size: "18px" }), rightSection: loading ? /* @__PURE__ */ import_react7.default.createElement(import_core5.Loader, { color: "white", size: "sm" }) : null }, "Add Admin")))));
};

// src/components/TokensTable.tsx
var import_form2 = require("@mantine/form");
var import_dexie_react_hooks2 = require("dexie-react-hooks");
var TokensTable = (props) => {
  const { reloadTokensFromContract } = useTokenKitContext();
  const { DataTable } = props;
  const [page, setPage] = (0, import_react9.useState)(1);
  const [tokens, setTokens] = (0, import_react9.useState)([]);
  const [token, setToken] = (0, import_react9.useState)();
  const [opened, { open, close }] = (0, import_hooks2.useDisclosure)(false);
  const tokensPerPage = 25;
  const totalTokens = (0, import_dexie_react_hooks2.useLiveQuery)(() => db.tokens.count());
  const have_tokens_changed = (0, import_dexie_react_hooks2.useLiveQuery)(() => db.tokens.toArray());
  const filterForm = (0, import_form2.useForm)({
    initialValues: {
      searchedToken: "",
      common: "all",
      public: "all",
      verified: "all"
    }
  });
  async function loadTokensFromDB() {
    const limit = tokensPerPage;
    const offset = (page - 1) * tokensPerPage;
    const regex = new RegExp(`(${filterForm.values.searchedToken})`, "gi");
    const addressSearchTerm = removeTrailingZeros(filterForm.values.searchedToken);
    const addressRegex = new RegExp(`(${addressSearchTerm})`, "gi");
    const filteredTokens = await db.tokens.filter((token2) => {
      const matched = token2.symbol.match(regex) || token2.name.match(regex) || removeTrailingZeros(token2.address).match(addressRegex);
      return matched ? true : false;
    }).filter((token2) => {
      const common = filterForm.values.common;
      if (common === "true") {
        return token2.common === true;
      } else if (common === "false") {
        return token2.common === false;
      }
      return true;
    }).filter((token2) => {
      const verified = filterForm.values.verified;
      if (verified === "true") {
        return token2.verified === true;
      } else if (verified === "false") {
        return token2.verified === false;
      }
      return true;
    }).filter((token2) => {
      const _public = filterForm.values.public;
      if (_public === "true") {
        return token2.public === true;
      } else if (_public === "false") {
        return token2.public === false;
      }
      return true;
    }).limit(limit).offset(offset).toArray();
    setTokens(filteredTokens);
  }
  const updateTokenModal = (token2) => {
    setToken(token2);
    open();
  };
  const reloadTokens = () => {
    reloadTokensFromContract && reloadTokensFromContract();
  };
  const sortTokens = () => {
    const _tokens = tokens;
    return _tokens?.sort((a, b) => {
      if (a.verified && a.common && !b.verified) {
        return -1;
      } else if (a.verified && !a.common && !b.verified) {
        return -1;
      } else if (!a.verified && b.verified) {
        return 1;
      } else if (!a.verified && !b.verified) {
        return 1;
      } else {
        return a.common ? -1 : 1;
      }
    }) ?? [];
  };
  (0, import_react9.useEffect)(() => {
    loadTokensFromDB();
  }, [have_tokens_changed]);
  return /* @__PURE__ */ import_react9.default.createElement(import_core6.Stack, null, /* @__PURE__ */ import_react9.default.createElement(import_core6.Box, null, /* @__PURE__ */ import_react9.default.createElement("form", { onSubmit: filterForm.onSubmit((_values) => loadTokensFromDB()) }, /* @__PURE__ */ import_react9.default.createElement(import_core6.Grid, null, /* @__PURE__ */ import_react9.default.createElement(import_core6.Grid.Col, { span: { md: 3 } }, /* @__PURE__ */ import_react9.default.createElement(import_core6.TextInput, { label: "Search Token", placeholder: "Search by name, symbol or address", radius: "md", ...filterForm.getInputProps("searchedToken") })), /* @__PURE__ */ import_react9.default.createElement(import_core6.Grid.Col, { span: { md: 2 } }, /* @__PURE__ */ import_react9.default.createElement(import_core6.Select, { label: "Common", radius: "md", placeholder: "True/False", data: [
    { value: "all", label: "All" },
    { value: "true", label: "True" },
    { value: "false", label: "False" }
  ], ...filterForm.getInputProps("common") })), /* @__PURE__ */ import_react9.default.createElement(import_core6.Grid.Col, { span: { md: 2 } }, /* @__PURE__ */ import_react9.default.createElement(import_core6.Select, { label: "Verified", radius: "md", placeholder: "True/False", data: [
    { value: "all", label: "All" },
    { value: "true", label: "True" },
    { value: "false", label: "False" }
  ], ...filterForm.getInputProps("verified") })), /* @__PURE__ */ import_react9.default.createElement(import_core6.Grid.Col, { span: { md: 2 } }, /* @__PURE__ */ import_react9.default.createElement(import_core6.Select, { label: "Public", radius: "md", placeholder: "True/False", data: [
    { value: "all", label: "All" },
    { value: "true", label: "True" },
    { value: "false", label: "False" }
  ], ...filterForm.getInputProps("public") })), /* @__PURE__ */ import_react9.default.createElement(import_core6.Grid.Col, { span: { md: 3 } }, /* @__PURE__ */ import_react9.default.createElement(import_core6.Group, { h: "100%", justify: "start", align: "end" }, /* @__PURE__ */ import_react9.default.createElement(import_core6.Button, { radius: "md", type: "submit", size: "xs", leftSection: /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconFilter, { size: "16px" }) }, "Filter"), /* @__PURE__ */ import_react9.default.createElement(import_core6.Button, { color: "indigo", size: "xs", onClick: reloadTokens, radius: "md", leftSection: /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconReload, { size: "16px" }) }, "Refresh")))))), /* @__PURE__ */ import_react9.default.createElement(import_core6.Drawer, { opened, onClose: close, title: `Updating ${token?.name}`, position: "right", size: "sm" }, /* @__PURE__ */ import_react9.default.createElement(UpdateTokenForm, { data: token })), /* @__PURE__ */ import_react9.default.createElement(
    DataTable,
    {
      withTableBorder: true,
      minHeight: 300,
      verticalSpacing: "md",
      horizontalSpacing: "md",
      borderRadius: "lg",
      records: sortTokens() ?? [],
      columns: [
        {
          accessor: "id",
          title: "ID",
          width: "100px",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Text, { size: "sm" }, item.id)
        },
        {
          accessor: "name",
          title: "Name",
          width: "250px",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Group, { align: "center", gap: "sm" }, /* @__PURE__ */ import_react9.default.createElement(import_core6.Avatar, { src: item.icon, size: "md", radius: "md", tt: "uppercase" }, limitChars(item.name, 2, false)), /* @__PURE__ */ import_react9.default.createElement(import_core6.Text, { size: "sm" }, item.name))
        },
        {
          accessor: "symbol",
          title: "Symbol",
          width: "200px",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Text, { size: "sm" }, item.symbol)
        },
        {
          accessor: "address",
          title: "Token Address",
          width: "300px",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Group, { gap: 10, wrap: "nowrap" }, /* @__PURE__ */ import_react9.default.createElement(CustomCopyButton_default, { color: "green", copy_value: item.address }), /* @__PURE__ */ import_react9.default.createElement(import_core6.Text, { size: "sm" }, limitChars(item.address, 20, true)))
        },
        {
          accessor: "decimals",
          title: "Decimals",
          width: "100px",
          textAlign: "center",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Text, { size: "sm", ta: "center", fw: 500 }, item.decimals)
        },
        {
          accessor: "pair_id",
          title: "Pair ID (Pragma ID)",
          width: "200px",
          textAlign: "center",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Text, { size: "sm" }, item.pair_id)
        },
        {
          accessor: "common",
          title: "Common",
          width: "150px",
          textAlign: "center",
          render: (item, i) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Group, { justify: "center" }, item.common ? /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconCheck, { color: "green", stroke: (0, import_core6.em)(1.5) }) : /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconX, { color: "red", stroke: (0, import_core6.em)(1.5) }))
        },
        {
          accessor: "verified",
          title: "Verified",
          width: "150px",
          textAlign: "center",
          render: (item, i) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Group, { justify: "center" }, item.verified ? /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconCheck, { color: "green", stroke: (0, import_core6.em)(1.5) }) : /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconX, { color: "red", stroke: (0, import_core6.em)(1.5) }))
        },
        {
          accessor: "public",
          title: "Public",
          width: "150px",
          textAlign: "center",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Group, { justify: "center" }, item.public ? /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconCheck, { color: "green", stroke: (0, import_core6.em)(1.5) }) : /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconX, { color: "red", stroke: (0, import_core6.em)(1.5) }))
        },
        {
          accessor: "actions",
          title: "Actions",
          width: "170px",
          textAlign: "center",
          render: (item) => /* @__PURE__ */ import_react9.default.createElement(import_core6.Group, { justify: "center" }, /* @__PURE__ */ import_react9.default.createElement(import_core6.ActionIcon, { onClick: () => updateTokenModal(item) }, /* @__PURE__ */ import_react9.default.createElement(import_icons_react4.IconWriting, null)), /* @__PURE__ */ import_react9.default.createElement(VerifyTokenBtn, { token_index: item.id }))
        }
      ],
      page,
      onPageChange: setPage,
      totalRecords: totalTokens,
      recordsPerPage: 25
    }
  ));
};
var TokensTable_default = TokensTable;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddAdminForm,
  ListTokenForm,
  SelectTokenContainer,
  SelectTokenModal,
  TokenKitWrapper,
  TokensTable,
  UpdateAdminForm,
  UpdateTokenForm,
  bigintToLongAddress,
  bigintToShortStr,
  convertToReadableTokens,
  limitChars,
  useTokenKitContext
});
