import { Address } from "viem";
import { base, mainnet, optimism } from "viem/chains";


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