// return shortened or "sliced" address that is checksumed, middle shortened to ..., from the 42-chars ethereum address 
// Not to be confused with https://viem.sh/docs/utilities/slice


// checksum encoded

import { Address, getAddress, isHex  } from 'viem';
import { getShortHex } from './hex';


export type GetShortAddressReturnType = string | null;

export const getShortAddress = (address:Address, sectionLength:number = 4):GetShortAddressReturnType =>{
    if(!isHex(address)|| (address as string )?.length !== 42){
        throw new Error('Invalid Address');
    }

    const checksumed = getAddress(address);

    return getShortHex(checksumed, sectionLength);

}
