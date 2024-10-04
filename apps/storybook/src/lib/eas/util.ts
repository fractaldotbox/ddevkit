import { EAS_CONFIG_BY_CHAIN_ID } from "@/utils/config";
import { Address, Chain } from "viem";
import { mainnet } from "viem/chains";


const getEasscanEndpoint = (chainId: number) => {
    return  EAS_CONFIG_BY_CHAIN_ID[chainId]?.easscanUrl;

}



export const getEasscanAttestationUrl = (chainId:number, uid:string, isOffchain: boolean)=>{

    if(isOffchain){
        return `${getEasscanEndpoint(chainId)}/offchain/attestation/view/${uid}`
    }
}


export const getEasscanAddressUrl = (chainId:number, address:Address)=>{
    return `${getEasscanEndpoint(chainId)}/address/${address}`
}



export const getEasscanSchemaUrl = (chainId:number, schemaId:string)=>{
    return `${getEasscanEndpoint(chainId)}/schema/view/${schemaId}`
}
