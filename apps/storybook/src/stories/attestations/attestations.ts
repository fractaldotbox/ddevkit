import { AllAttestationsByQuery, Attestation } from "node_modules/@repo/graphql/src/graphql/graphql"
import { Address } from "viem"
import {   format, formatDistance, subDays } from 'date-fns'
import { AttestationQueryResult } from "@/lib/eas/get-attestations";

export enum AttestationType {
    Onchain = 'onchain',
    Offchain = 'offchain'
}

// TODO sync graphql type
export const asAttestationMeta = (attestation: AttestationQueryResult) => {
    const {id, attester, recipient, schemaId, schema,  txid, isOffchain, time:_time} = attestation;
    const schemaName  = schema?.schemaNames?.[0]?.name;
    const time = _time || new Date().getTime();
    // TODO component take control of format/locales
    const ageDisplayed = formatDistance(new Date(time * 1000), new Date());
    return {
        id,
        schemaId,
        schemaIndex: schema?.index,
        schemaName,
        from: attester as Address,
        to: recipient as Address,
        type: isOffchain ? AttestationType.Offchain : AttestationType.Onchain,
        txid,
        time,
        ageDisplayed
    }
}

export type AttestationMeta = {
    id: string,
    schemaId: string,
    schemaIndex: string,
    schemaName: string,
    from: Address,
    to: Address,
    type: AttestationType,
    ageDisplayed: string,
    txid: string,
}
