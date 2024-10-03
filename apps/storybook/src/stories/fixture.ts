import { faker } from '@faker-js/faker';
import { addr } from 'micro-eth-signer';
import { Address } from 'viem';

const vitalik = {
    ens: 'vitalik.eth',
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' as  Address
}

// mainnet, base https://easscan.org/address/0x1e3de6aE412cA218FD2ae3379750388D414532dc
// https://github.com/ethereum-attestation-service/eas-sdk/blob/master/README.md?plain=1#L123
const easSampleAttester = {
    address: '0x1e3de6aE412cA218FD2ae3379750388D414532dc' as Address,
}

export const BY_USER = {
    vitalik,
    easSampleAttester
}



export const getRandomAccount = ()=>{
    return addr.random();
}


export const getRandomAddress = ()=>{
    return addr.random().address as Address;
}
