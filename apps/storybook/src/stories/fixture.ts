import { faker } from '@faker-js/faker';
import { addr } from 'micro-eth-signer';

 const vitalik = {
    ens: 'vitalik.eth',
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
}

export const BY_USER = {
    vitalik
}



export const getRandomAccount = ()=>{
    return addr.random();
}


export const getRandomAddress = ()=>{
    return addr.random().address;
}
