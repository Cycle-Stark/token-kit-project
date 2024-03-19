import React, { ReactNode } from 'react';

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
    pair_id?: string;
    price?: any;
}
interface ITokenKitWrapper {
    children: ReactNode;
    usingMantine: boolean;
    theme: 'dark' | 'light';
    primaryColor: 'blue' | 'cyan' | 'dark' | 'grape' | 'gray' | 'green' | 'indigo' | 'lime' | 'orange' | 'pink' | 'red' | 'teal' | 'violet' | 'yellow';
    network: 'SN_MAIN' | 'SN_GOERLI';
    nodeUrl: string;
}
interface IModalThemeObject {
    textColor: string;
    modalBackground: string;
    headerFooterBackground: string;
    searchBorderColor: string;
    searchBackgroundColor: string;
    searchTextColor: string;
    tokenBackgroundColor: string;
    tokenHoverColor: string;
}

declare const TokenKitWrapper: (props: ITokenKitWrapper) => React.JSX.Element;

declare const useTokenKitContext: () => {
    contract: any;
    pragma_contract: any;
    account: any;
    address: any;
    connection: any;
    handleConnetDisconnectWalletBtnClick: any;
    network: any;
    reloadTokensFromContract: any;
    loadingTokens: boolean;
    primaryColor: string;
};

interface ISelectTokenModal {
    selectedToken: IToken | undefined;
    children?: React.ReactNode;
    callBackFunc: (token: IToken) => void;
    themeObject: IModalThemeObject;
    modalHeight?: string;
    close?: any;
}
declare const SelectTokenContainer: ({ modalHeight, selectedToken, callBackFunc, themeObject, close }: ISelectTokenModal) => React.JSX.Element;
declare const SelectTokenModal: (props: ISelectTokenModal) => React.JSX.Element;

declare const TokensTable: (props: any) => React.JSX.Element;

interface IUpdateTokenForm {
    data: any;
}
declare const UpdateTokenForm: (props: IUpdateTokenForm) => React.JSX.Element;
declare const ListTokenForm: () => React.JSX.Element;
declare const AddAdminForm: () => React.JSX.Element;
declare const UpdateAdminForm: (props: {
    data: any;
}) => React.JSX.Element;

declare function bigintToShortStr(bigintstr: string): string;
declare function bigintToLongAddress(bigintstr: string): string;
declare function convertToReadableTokens(tokens: any, decimals: number): string;
declare function limitChars(str: string, count: number, show_dots: boolean): string;

export { AddAdminForm, type IModalThemeObject, type IToken, ListTokenForm, SelectTokenContainer, SelectTokenModal, TokenKitWrapper, TokensTable, UpdateAdminForm, UpdateTokenForm, bigintToLongAddress, bigintToShortStr, convertToReadableTokens, limitChars, useTokenKitContext };
