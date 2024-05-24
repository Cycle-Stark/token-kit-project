import React, { ReactNode } from 'react';
import Dexie, { Table } from 'dexie';

interface IModalThemeObject {
    r: string;
    textColor: string;
    headerFooterBg: string;
    backgroundColor: string;
    fontFamily: string;
    searchBackground: string;
    searchColor: string;
    searchBorderColor: string;
    searchFocusBorderColor: string;
    primaryColor: string;
}
interface IModalProps {
    themeObject: IModalThemeObject;
    selectedToken: IToken | undefined;
    children?: ReactNode;
    callBackFunc: (token: IToken) => void;
    modalHeight?: string;
}

interface IToken {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    icon: string;
    verified?: boolean;
    public?: boolean;
    common?: boolean;
    id?: number;
    price?: any;
}
interface ITokenKitWrapper {
    children: ReactNode;
    network: 'SN_MAIN' | 'SN_SEPOLIA';
    mainnetNodeURL: string;
    sepoliaNodeURL: string;
}
interface TokensDBInfo {
    id: 1;
    name: string;
    tokens_version: number;
    tokens_count: number;
}

declare const SelectTokenContainer: (props: IModalProps & {
    custsomClasses?: string;
    closeModal?: any;
}) => React.JSX.Element;
declare const SelectTokenModal: (props: IModalProps) => React.JSX.Element;

declare class TokenKitDBDexie extends Dexie {
    tokens: Table<IToken>;
    info: Table<TokensDBInfo>;
    mainnet_tokens: Table<IToken>;
    mainnet_info: Table<TokensDBInfo>;
    constructor();
}
declare const db: TokenKitDBDexie;

declare function bigintToShortStr(bigintstr: string): string;
declare function bigintToLongAddress(bigintstr: string): string;
declare function convertToReadableTokens(tokens: any, decimals: number): string;
declare function limitChars(str: string, count: number, show_dots: boolean): string;

declare const useTokenKitContext: () => {
    contract: any;
    account: any;
    address: any;
    connection: any;
    handleConnetDisconnectWalletBtnClick: any;
    network: any;
    reloadTokensFromContract: any;
    loadingTokens: boolean;
};

declare const TokenKitWrapper: (props: ITokenKitWrapper) => React.JSX.Element;

export { type IModalProps, type IToken, SelectTokenContainer, SelectTokenModal, TokenKitWrapper, bigintToLongAddress, bigintToShortStr, convertToReadableTokens, db, TokenKitWrapper as default, limitChars, useTokenKitContext };
