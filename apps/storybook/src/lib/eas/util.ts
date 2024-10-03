import { EAS_CONFIG_BY_CHAIN_ID } from "@/utils/config";
import { Address, Chain } from "viem";
import { mainnet } from "viem/chains";


const getEasscanEndpoint = (chain: Chain) => {
    return  EAS_CONFIG_BY_CHAIN_ID[chain.id]?.easscanUrl;

}



export const getEasscanAddressUrl = (chain:Chain, address:Address)=>{
    return `${getEasscanEndpoint(chain)}/address/${address}`
}



export const getEasscanSchemaUrl = (chain:Chain, schemaId:string)=>{
    return `${getEasscanEndpoint(chain)}/schema/view/${schemaId}`
}
