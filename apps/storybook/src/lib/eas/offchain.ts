import { type CompactAttestationShareablePackageObject, type AttestationShareablePackageObject, SignedOffchainAttestation, SignedOffchainAttestationV1 } from "@ethereum-attestation-service/eas-sdk";
import { base64 } from '@scure/base';
import { zlibSync } from 'fflate';
import { stringifyWithBigInt } from "./util";
import { ZERO_ADDRESS, ZERO_HASH } from "../constants";

// Clone from official sdk 
const ZeroAddress = ZERO_ADDRESS;
const ZeroHash = ZERO_HASH;

export enum OffchainAttestationVersion {
    Legacy = 0,
    Version1 = 1,
    Version2 = 2
}

export const isSignedOffchainAttestationV1 = (
    attestation: SignedOffchainAttestation | SignedOffchainAttestationV1
  ): attestation is SignedOffchainAttestationV1 => {
    return 'v' in attestation && 'r' in attestation && 's' in attestation;
  };

const convertV1AttestationToV2 = (attestation: SignedOffchainAttestationV1): SignedOffchainAttestation => {
    const { v, r, s, ...rest } = attestation;
    return {
        ...rest,
        version: OffchainAttestationVersion.Version1,
        signature: {
        v,
        r,
        s
        }
    };
};
  
  
export const compactOffchainAttestationPackage = (
    pkg: AttestationShareablePackageObject
  ): CompactAttestationShareablePackageObject => {
    const { signer } = pkg;
    let { sig } = pkg;
  
    if (isSignedOffchainAttestationV1(sig)) {
      sig = convertV1AttestationToV2(sig);
    }
  
    return [
      sig.domain.version,
      sig.domain.chainId,
      sig.domain.verifyingContract,
      sig.signature.r,
      sig.signature.s,
      sig.signature.v,
      signer,
      sig.uid,
      sig.message.schema,
      sig.message.recipient === ZeroAddress ? '0' : sig.message.recipient,
      Number(sig.message.time),
      Number(sig.message.expirationTime),
      sig.message.refUID === ZeroHash ? '0' : sig.message.refUID,
      sig.message.revocable,
      sig.message.data,
      0,
      sig.message.version,
      sig.message.salt
    ];
  };

/**
 * 
 * Key changes:
 * 
 * - fflate over pako is used as it's both faster and smaller (tree-shakable)
 *  - it's backward compatabile as both align with zlib spec and current pako settings can decrypt fflate's output and vice versa
 *   - given both use zlib defaults strategy. however, output are not the same 
 * - in theory give fixed schema, we could apply dictionary to improve compression/decompression but that will be breaking changes
 * - At browsers, CompressionStream can be used but that runs inside worker. 
 * - for base64, @scure/base is a secure, fast, tree-shakable, sub-dependency of viem and simplify compatability, although we could use window.atob at browser and Buffer at node
 * - serialize bigint into hex could improve compression but that will be breaking change
*/

export const zipAndEncodeToBase64 = (pkg: AttestationShareablePackageObject)=>{
    const compacted = compactOffchainAttestationPackage(pkg);

    const encoded = stringifyWithBigInt(compacted);
    const encodedBytes = new TextEncoder().encode(encoded);
    const zipped = zlibSync(encodedBytes, { level: 9 });

    return base64.encode(zipped);
}

export const createOffchainURL = (pkg: AttestationShareablePackageObject)=>{
    const base64 = zipAndEncodeToBase64(pkg);
    return `/offchain/url/#attestation=${encodeURIComponent(base64)}`;
}

