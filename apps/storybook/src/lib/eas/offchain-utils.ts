import {  type AttestationShareablePackageObject, compactOffchainAttestationPackage } from "@ethereum-attestation-service/eas-sdk";
import { base64 } from '@scure/base';
import { zlibSync } from 'fflate';
import { stringifyWithBigInt } from "./util";


/**
 * 
 * Key changes:
 * 
 * - fflate over pako for compression as it's both faster and smaller (tree-shakable)
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

