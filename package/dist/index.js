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
  SelectTokenContainer: () => SelectTokenContainer,
  SelectTokenModal: () => Modal_default,
  TokenKitWrapper: () => wrapper_default,
  bigintToLongAddress: () => bigintToLongAddress,
  bigintToShortStr: () => bigintToShortStr,
  convertToReadableTokens: () => convertToReadableTokens,
  db: () => db,
  default: () => src_default,
  limitChars: () => limitChars,
  useTokenKitContext: () => useTokenKitContext
});
module.exports = __toCommonJS(src_exports);

// src/components/Modal.tsx
var import_react3 = __toESM(require("react"));
var import_dexie_react_hooks = require("dexie-react-hooks");

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
var TOKEN_KIT_ABI = token_kit_abi_default;
var TOKEN_KIT_CONTRACT_ADDRESS_TESTNET = "0x43bb576fa2a312a56e81d7e1ae2fb2a500895e670155209daf13c4d3a3c434e";
var TOKEN_KIT_CONTRACT_ADDRESS_MAINNET = "0x01aeadb1baa972250f9d3dea67a12407439ecd30e6c68d78f34569f8a8009f17";
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

// src/providers/providerUtils.ts
var import_react = require("react");
var initialData = {
  contract: null,
  account: null,
  address: null,
  connection: null,
  handleConnetDisconnectWalletBtnClick: null,
  network: null,
  reloadTokensFromContract: null,
  loadingTokens: false
};
var TokenKitContext = (0, import_react.createContext)(initialData);
var useTokenKitContext = () => {
  return (0, import_react.useContext)(TokenKitContext);
};

// src/components/CloseSvg.tsx
var import_react2 = __toESM(require("react"));
var CloseSvg = () => {
  return /* @__PURE__ */ import_react2.default.createElement(
    "svg",
    {
      className: "close-svg",
      version: "1.1",
      viewBox: "0 0 512 512",
      xmlSpace: "preserve",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    },
    /* @__PURE__ */ import_react2.default.createElement("path", { d: "M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" })
  );
};
var CloseSvg_default = CloseSvg;

// src/components/Modal.tsx
var TokenBtn = ({ token, select, selectedToken }) => {
  const [renderInitials, setRenderInitials] = (0, import_react3.useState)(false);
  const selectToken = () => {
    select({ ...token });
  };
  const imageloadOnError = () => {
    setRenderInitials(true);
  };
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "token-btn", onClick: selectToken, style: {
    pointerEvents: token.address === selectedToken?.address ? "none" : "all",
    background: token?.address === selectedToken?.address ? "var(--header-footer-bg)" : "transparent"
  } }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "logo-holder" }, renderInitials ? /* @__PURE__ */ import_react3.default.createElement("p", { style: { textTransform: "uppercase", fontSize: "16px" } }, limitChars(token?.symbol, 2, false)) : /* @__PURE__ */ import_react3.default.createElement("img", { src: token.icon ?? "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Tether-USDT-icon.png", onError: imageloadOnError, alt: "", className: "logo" })), /* @__PURE__ */ import_react3.default.createElement("p", null, token?.symbol));
};
var TokenListItem = ({ token, select, selectedToken }) => {
  const [renderInitials, setRenderInitials] = (0, import_react3.useState)(false);
  const selectToken = () => {
    select({ ...token });
  };
  const imageloadOnError = () => {
    setRenderInitials(true);
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
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "token-list-item", onClick: selectToken, style: {
    pointerEvents: token.address === selectedToken?.address ? "none" : "all",
    background: token?.address === selectedToken?.address ? "var(--header-footer-bg)" : "transparent"
  } }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "logo-holder" }, renderInitials ? /* @__PURE__ */ import_react3.default.createElement("p", { style: { textTransform: "uppercase", fontSize: "16px" } }, limitChars(token?.symbol, 2, false)) : /* @__PURE__ */ import_react3.default.createElement("img", { src: token.icon ?? "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Tether-USDT-icon.png", onError: imageloadOnError, alt: "", className: "logo" })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "token-content" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "symbol-holder" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "symbol" }, token?.symbol), getImageUrl() ? /* @__PURE__ */ import_react3.default.createElement("img", { src: getImageUrl()?.badge, height: "14px", title: getImageUrl()?.msg, width: "14px" }) : null), /* @__PURE__ */ import_react3.default.createElement("p", { className: "name" }, token?.name)));
};
var SelectTokenContainer = (props) => {
  const { themeObject, selectedToken, children, callBackFunc } = props;
  const [showModal, setShowModal] = (0, import_react3.useState)(false);
  const { loadingTokens, network } = useTokenKitContext();
  const [totalTokens, setTotalTokens] = (0, import_react3.useState)(0);
  const [tokens, setTokens] = (0, import_react3.useState)([]);
  const [commonTokens, setCommonTokens] = (0, import_react3.useState)([]);
  const [searchedToken, setSearchedToken] = (0, import_react3.useState)("");
  const [page, setPage] = (0, import_react3.useState)(1);
  const have_tokens_changed = (0, import_dexie_react_hooks.useLiveQuery)(() => db.tokens.toArray());
  const tokensPerPage = 50;
  const selectSingle = (token) => {
    callBackFunc && callBackFunc(token);
    props.closeModal && props.closeModal();
  };
  const loadCommonTokens = async () => {
    if (network === "SN_SEPOLIA") {
      const common_tks = await db.tokens.filter((t) => (t.common ?? false) && (t.public ?? false)).toArray();
      setCommonTokens(common_tks);
    } else if (network === "SN_MAIN") {
      const common_tks = await db.mainnet_tokens.filter((t) => (t.common ?? false) && (t.public ?? false)).toArray();
      setCommonTokens(common_tks);
    }
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
    if (network === "SN_SEPOLIA") {
      const filteredTokens = await db.tokens.filter((token) => {
        const matched = token.symbol.match(regex) || token.name.match(regex) || removeTrailingZeros(token.address).match(addressRegex);
        return matched ? true : false;
      }).filter((token) => !!token.public).limit(limit).offset(offset).toArray();
      const sortedTokens = sortTokens(filteredTokens);
      setTokens(sortedTokens);
    } else if (network === "SN_MAIN") {
      const filteredTokens = await db.mainnet_tokens.filter((token) => {
        const matched = token.symbol.match(regex) || token.name.match(regex) || removeTrailingZeros(token.address).match(addressRegex);
        return matched ? true : false;
      }).filter((token) => !!token.public).limit(limit).offset(offset).toArray();
      const sortedTokens = sortTokens(filteredTokens);
      setTokens(sortedTokens);
    }
  };
  const getNetwork = () => {
    if (network === "SN_MAIN") {
      return "Mainnet";
    }
    if (network === "SN_SEPOLIA") {
      return "Sepolia";
    }
  };
  (0, import_react3.useEffect)(() => {
    loadCommonTokens();
  }, [network]);
  (0, import_react3.useEffect)(() => {
    loadTokensFromDB();
  }, [searchedToken, page, loadingTokens, have_tokens_changed, network]);
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "tokenkit-wrapper" }, /* @__PURE__ */ import_react3.default.createElement(
    "div",
    {
      className: props?.custsomClasses ?? `select-container`,
      onClick: () => {
        props?.closeModal && props?.closeModal();
      },
      style: {
        "--text-color": themeObject.textColor ?? "black",
        "--header-footer-bg": themeObject.headerFooterBg ?? "gray",
        "--bg-color": themeObject.backgroundColor ?? "#fff",
        "--font-family": themeObject.fontFamily ?? "Helvetica",
        "--search-bg": themeObject.searchBackground ?? "black",
        "--search-color": themeObject.searchColor ?? "black",
        "--search-border-color": themeObject.searchBorderColor ?? "black",
        "--search-focus-border-color": themeObject.searchFocusBorderColor ?? "black",
        "--border-radius": themeObject.r ?? "20px",
        "--primary-color": themeObject.primaryColor ?? "blue"
      }
    },
    /* @__PURE__ */ import_react3.default.createElement("div", { className: "custom-modal-content", style: { height: props?.modalHeight ?? "95dvh" }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "custom-modal-header" }, /* @__PURE__ */ import_react3.default.createElement("h4", { className: "custom-modal-title" }, "Select Token"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "right" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "chain-id" }, getNetwork()), /* @__PURE__ */ import_react3.default.createElement("button", { className: "close", onClick: props.closeModal }, /* @__PURE__ */ import_react3.default.createElement(CloseSvg_default, null)))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "custom-modal-body" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "search-common-box" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "custom-search" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "text", placeholder: "Search by Name, Symbol or Address", className: "custom-search-input", value: searchedToken, onChange: (e) => setSearchedToken(e.target.value) })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "common-tokens" }, /* @__PURE__ */ import_react3.default.createElement("h5", null, "Common Tokens"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "common-tokens-list" }, commonTokens?.length === 0 ? /* @__PURE__ */ import_react3.default.createElement("p", { className: "no-tokens" }, "Common Token(s) Not Found! ", /* @__PURE__ */ import_react3.default.createElement("a", { href: "https://tokenkit-gamma.vercel.app/" }, "List here.")) : null, commonTokens?.map((token, i) => /* @__PURE__ */ import_react3.default.createElement(TokenBtn, { select: selectSingle, key: `token_${i}`, token, selectedToken }))))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "rest-of-tokens" }, tokens?.length === 0 ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "tokens-not-found-holder" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "no-tokens" }, "Token(s) Not Found! ", /* @__PURE__ */ import_react3.default.createElement("a", { href: "https://tokenkit-gamma.vercel.app/" }, "List here."))) : null, tokens?.map((token, i) => /* @__PURE__ */ import_react3.default.createElement(TokenListItem, { key: `jtoken_item_${i}`, token, select: selectSingle, selectedToken })))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "custom-modal-footer" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "top" }, /* @__PURE__ */ import_react3.default.createElement("a", { href: "https://tokenkit-gamma.vercel.app/list-token" }, "List New Token")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bottom" }, /* @__PURE__ */ import_react3.default.createElement("p", null, "Want to try Starknet Tokenkit?", /* @__PURE__ */ import_react3.default.createElement("a", { href: "https://tokenkit-gamma.vercel.app" }, "Check it out!")))))
  ));
};
var SelectTokenModal = (props) => {
  const { themeObject, children } = props;
  const [showModal, setShowModal] = (0, import_react3.useState)(false);
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "tokenkit-wrapper" }, /* @__PURE__ */ import_react3.default.createElement("div", { onClick: () => setShowModal(true) }, children), /* @__PURE__ */ import_react3.default.createElement(SelectTokenContainer, { ...props, custsomClasses: `custom-modal ${showModal ? "show" : ""}`, closeModal: () => setShowModal(false) }));
};
var Modal_default = SelectTokenModal;

// src/wrapper.tsx
var import_react5 = __toESM(require("react"));

// src/providers/tokenkitprovider.tsx
var import_react4 = __toESM(require("react"));
var import_starknet2 = require("starknet");
var import_starknetkit = require("starknetkit");
var import_bignumber2 = __toESM(require("bignumber.js"));
var TokenKitProvider = ({ children, mainnetNodeURL, sepoliaNodeURL, network }) => {
  const [contract, setContract] = (0, import_react4.useState)();
  const [connection, setConnection] = (0, import_react4.useState)();
  const [account, setAccount] = (0, import_react4.useState)();
  const [address, setAddress] = (0, import_react4.useState)("");
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [network_, setNetwork] = (0, import_react4.useState)(network);
  const connectWallet = async () => {
    try {
      const connection2 = await (0, import_starknetkit.connect)({
        webWalletUrl: "https://web.argent.xyz",
        dappName: "Token Kit",
        modalMode: "canAsk"
      });
      if (connection2 && connection2?.wallet) {
        setConnection(connection2);
        setAccount(connection2?.wallet?.account);
        setAddress(connection2?.wallet?.selectedAddress);
        if (connection2?.wallet?.id === "argentX") {
          const chainID_FROM_PROVIDER = bigintToShortStr(connection2?.wallet?.provider?.provider?.chainId);
          setNetwork(chainID_FROM_PROVIDER);
        } else {
          const chainID_FROM_PROVIDER = bigintToShortStr(connection2?.wallet?.provider?.chainId);
          setNetwork(chainID_FROM_PROVIDER);
        }
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
  const makeContractConnection = () => {
    try {
      if (network_ === "SN_SEPOLIA") {
        let provider = new import_starknet2.RpcProvider({ nodeUrl: sepoliaNodeURL });
        let contract2 = new import_starknet2.Contract(TOKEN_KIT_ABI, TOKEN_KIT_CONTRACT_ADDRESS_TESTNET, provider);
        if (account) {
          contract2 = new import_starknet2.Contract(TOKEN_KIT_ABI, TOKEN_KIT_CONTRACT_ADDRESS_TESTNET, account);
        }
        setContract(contract2);
      } else if (network_ === "SN_MAIN") {
        let provider = new import_starknet2.RpcProvider({ nodeUrl: mainnetNodeURL });
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
      disconnectWallet();
    }
  };
  const loadTokens = async (page) => {
    try {
      const res = await contract.get_tokens(page);
      return res;
    } catch (error) {
      return [];
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
      common: token?.common
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
      if (network_ === "SN_SEPOLIA") {
        db.tokens.clear();
        db.tokens.bulkPut(combinedTokens).then((res) => {
        }).catch((error) => {
        });
      }
      if (network_ === "SN_MAIN") {
        db.mainnet_tokens.clear();
        db.mainnet_tokens.bulkPut(combinedTokens).then((res) => {
        }).catch((error) => {
        });
      }
      setLoading(false);
    } catch (error) {
    }
  };
  const checkAndReloadTokensForVersion = async () => {
    try {
      if (contract) {
        const totalTokens = await contract.get_tokens_count();
        const totalTokensReadable = new import_bignumber2.default(totalTokens).toNumber();
        const tokens_version = await contract.get_tokens_version();
        const readable_tokens_version = new import_bignumber2.default(tokens_version).toNumber();
        if (network === "SN_SEPOLIA") {
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
  const contextValue = (0, import_react4.useMemo)(() => ({
    contract,
    account,
    address,
    connection,
    network: network_,
    handleConnetDisconnectWalletBtnClick,
    reloadTokensFromContract: () => {
    },
    loadingTokens: loading
  }), [account, contract?.address, address, network_, mainnetNodeURL, sepoliaNodeURL]);
  (0, import_react4.useEffect)(() => {
    makeContractConnection();
  }, [network_, mainnetNodeURL, sepoliaNodeURL, account]);
  (0, import_react4.useEffect)(() => {
    checkAndReloadTokensForVersion();
  }, [contract?.address, network_, mainnetNodeURL, sepoliaNodeURL, account]);
  (0, import_react4.useEffect)(() => {
    connectWallet();
  }, []);
  return /* @__PURE__ */ import_react4.default.createElement(TokenKitContext.Provider, { value: contextValue }, children);
};
var tokenkitprovider_default = TokenKitProvider;

// src/wrapper.tsx
var TokenKitWrapper = (props) => {
  const { children, network, mainnetNodeURL, sepoliaNodeURL } = props;
  return /* @__PURE__ */ import_react5.default.createElement(tokenkitprovider_default, { mainnetNodeURL, sepoliaNodeURL, network }, children);
};
var wrapper_default = TokenKitWrapper;

// src/index.ts
var src_default = wrapper_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SelectTokenContainer,
  SelectTokenModal,
  TokenKitWrapper,
  bigintToLongAddress,
  bigintToShortStr,
  convertToReadableTokens,
  db,
  limitChars,
  useTokenKitContext
});
