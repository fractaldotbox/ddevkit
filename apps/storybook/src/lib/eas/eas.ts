import type { Signer } from "ethers";

export enum SignatureType {
    Direct = 'direct',
    Delegated = 'delegated',
    DelegatedProxy = 'delegated-proxy',
    Offchain = 'offchain'
}



interface RequestOptions {
    signatureType?: SignatureType;
    deadline?: bigint;
    from: Signer;
    value?: bigint;
    maxPriorityFeePerGas?: bigint | Promise<bigint>;
    maxFeePerGas?: bigint | Promise<bigint>;
  }
  
  export interface AttestationOptions extends RequestOptions {
    bump?: number;
  }
  