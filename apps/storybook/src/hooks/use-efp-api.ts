// hooks
import qs from 'querystring';
import { useQuery } from "@tanstack/react-query"
import { Address } from 'viem';


// fixture

const EFP_ENDPOINT = 'https://api.ethfollow.xyz/api/v1/';

type AddressOrEns = Address | string;

export type EfpApiOptions = {
    limit?:number, sort?:any
}

// TODO support paginations, sort
// hard limit is unkonwn
export const getEndpointUserFollowing = (addressOrEns:AddressOrEns, options?:EfpApiOptions)=>{
    const {limit = 100, sort = 'followers'} = options || {};
    return `${EFP_ENDPOINT}users/${addressOrEns}/following?${qs.stringify({limit, sort})}`
}

export const getEndpointUserFollowers = (addressOrEns:AddressOrEns,  options?:EfpApiOptions)=>{
    const {limit = 100, sort = 'followers'} = options || {};
    return `${EFP_ENDPOINT}users/${addressOrEns}/followers?${qs.stringify({limit, sort})}`
}

export const getEndpointEnsData = (addressOrEns:AddressOrEns, options?:EfpApiOptions)=>{
    const {limit = 10, sort = 'followers'} = options || {};
    return `${EFP_ENDPOINT}users/${addressOrEns}/ens?${qs.stringify({limit, sort})}`
}


// TODO use options at query key
export const useFollowers = (addressOrEns:AddressOrEns, options?:EfpApiOptions) =>{
    return  useQuery({
        queryKey: ['ethfollow.followers', addressOrEns],
        queryFn: async () =>{
            const endpoint = getEndpointUserFollowers(addressOrEns, options);

            return fetch(endpoint).then(res=>res.json());

        }
          
      });
}

export const useFollowing = (addressOrEns:AddressOrEns) =>{
    return  useQuery({
        queryKey: ['ethfollow.following', addressOrEns],
        queryFn: async () =>{
            
            const endpoint = getEndpointUserFollowing(addressOrEns);

            return fetch(endpoint).then(res=>res.json());
        }
          
      });
}

export const useEnsData = (addressOrEns:AddressOrEns) =>{
    return  useQuery({
        queryKey: ['ethfollow.ens', addressOrEns],
        queryFn: async () =>{

            
            const endpoint = getEndpointEnsData(addressOrEns);

            return fetch(endpoint).then(res=>res.json());
        }
            
        });
}