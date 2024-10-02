import { Address } from "viem";
import { base, mainnet, optimism, sepolia } from "viem/chains";


export enum Token  {
    USDC = 'usdc',

}

export const BY_CHAIN_ID = {
    [mainnet.id]: {
        [Token.USDC]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    },
    [optimism.id]: {
        [Token.USDC]: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85'
    },
    [base.id]:{
        [Token.USDC]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
    }
} as Record<number, {
    [key in Token]: Address;
}>;

// TODO generate from config
export const  EAS_CONFIG_BY_CHAIN_ID = {
    [mainnet.id]: {
        eas: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
        graphqlEndpoint: 'https://easscan.org/graphql'
    },
    [sepolia.id]:{
        eas: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
        graphqlEndpoint: 'https://sepolia.easscan.org/graphql'
    },
    [optimism.id]: {
        eas: '0xE132c2E90274B44FfD8090b58399D04ddc060AE1',
        graphqlEndpoint: 'https://optimism.easscan.org/graphql'
    },
    [base.id]:{
        eas: '0xF095fE4b23958b08D38e52d5d5674bBF0C03cbF6',
        graphqlEndpoint: 'https://base.easscan.org/graphql'
        
    }
}


export const ABI_ERC20 = [
    {
      type: 'function',
      name: 'balanceOf',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'totalSupply',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'supply', type: 'uint256' }],
    },
  ] as const