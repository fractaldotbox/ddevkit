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
        graphqlEndpoint: 'https://easscan.org/graphql',
        easscanUrl: 'https://easscan.org'
    },
    [sepolia.id]:{
        eas: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
        graphqlEndpoint: 'https://sepolia.easscan.org/graphql',
        easscanUrl: 'https://sepolia.easscan.org'
    },
    [optimism.id]: {
        eas: '0xE132c2E90274B44FfD8090b58399D04ddc060AE1',
        graphqlEndpoint: 'https://optimism.easscan.org/graphql',
        easscanUrl: 'https://optimism.easscan.org'
    },
    [base.id]:{
        eas: '0xF095fE4b23958b08D38e52d5d5674bBF0C03cbF6',
        graphqlEndpoint: 'https://base.easscan.org/graphql',
        easscanUrl: 'https://base.easscan.org'
        
    }
} as Record<number, {
    eas: string,
    graphqlEndpoint: string,
    easscanUrl: string
}>



// Note ens endpoints subject to rate limit
// TODO auto generate this from https://github.com/ensdomains/ensjs/blob/main/packages/ensjs/src/contracts/consts.ts#L169
export const  ENS_CONFIG_BY_CHAIN_ID = {
    [mainnet.id]: {
        subgraphs:{
            ens: {
                url: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
            },
        },
        ensBaseRegistrarImplementation: {
          address: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
        },
        ensBulkRenewal: {
          address: '0xa12159e5131b1eEf6B4857EEE3e1954744b5033A',
        },
        ensDnsRegistrar: {
          address: '0xB32cB5677a7C971689228EC835800432B339bA2B',
        },
        ensDnssecImpl: {
          address: '0x0fc3152971714E5ed7723FAFa650F86A4BaF30C5',
        },
        ensEthRegistrarController: {
          address: '0x253553366Da8546fC250F225fe3d25d0C782303b',
        },
        ensNameWrapper: {
          address: '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401',
        },
        ensPublicResolver: {
          address: '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63',
        },
        ensRegistry: {
          address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        },
        ensReverseRegistrar: {
          address: '0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb',
        },
        ensUniversalResolver: {
          address: '0xce01f8eee7E479C928F8919abD53E553a36CeF67',
        },
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