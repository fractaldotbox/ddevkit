import { faker } from '@faker-js/faker';

 const vitalik = {
    ens: 'vitalik.eth',
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
}

export const BY_USER = {
    vitalik
}


export const getRandomAddress = ()=>{
    return faker.finance.ethereumAddress()
}
