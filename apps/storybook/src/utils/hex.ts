import { Hex } from "viem";


export type GetShortAddressReturnType = string | null;

export const getShortHex = (hex:Hex, sectionLength:number= 4):GetShortAddressReturnType =>{

    return [hex.slice(0,sectionLength+2), hex.slice(-sectionLength) ].join('...')
}
