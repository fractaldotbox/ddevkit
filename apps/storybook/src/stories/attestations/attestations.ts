import { AllAttestationsByQuery, Attestation } from "node_modules/@repo/graphql/src/graphql/graphql"
import { Address } from "viem"
import {   formatDistance, subDays } from 'date-fns'
import { AttestationQueryResult } from "@/lib/eas/get-attestations";

export enum AttestationType {
    Onchain = 'onchain',
    Offchain = 'offchain'
}

// TODO sync graphql type
export const asAttestationMeta = (attestation: AttestationQueryResult) => {
    const {id, attester, recipient, schemaId, txid, isOffchain, time = new Date().getTime()} = attestation;

    const ageDisplayed = formatDistance(new Date(time * 1000), new Date());

    return {
        id,
        schemaId,
        from: attester,
        to: recipient,
        type: isOffchain ? AttestationType.Offchain : AttestationType.Onchain,
        txid,
        time,
        ageDisplayed
    }
}

export type AttestationMeta = {
    id: string,
    schemaId: string,
    from: Address,
    to: Address,
    atteser: Address,
    type: AttestationType,
    ageDisplayed: string,
    txid: string,
}
