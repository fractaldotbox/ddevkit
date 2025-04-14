// Note ens endpoints subject to rate limit

import { mainnet } from "viem/chains";

// TODO auto generate this from https://github.com/ensdomains/ensjs/blob/main/packages/ensjs/src/contracts/consts.ts#L169
export const ENS_CONFIG_BY_CHAIN_ID = {
	[mainnet.id]: {
		subgraphs: {
			ens: {
				url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
			},
		},
		ensBaseRegistrarImplementation: {
			address: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
		},
		ensBulkRenewal: {
			address: "0xa12159e5131b1eEf6B4857EEE3e1954744b5033A",
		},
		ensDnsRegistrar: {
			address: "0xB32cB5677a7C971689228EC835800432B339bA2B",
		},
		ensDnssecImpl: {
			address: "0x0fc3152971714E5ed7723FAFa650F86A4BaF30C5",
		},
		ensEthRegistrarController: {
			address: "0x253553366Da8546fC250F225fe3d25d0C782303b",
		},
		ensNameWrapper: {
			address: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
		},
		ensPublicResolver: {
			address: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
		},
		ensRegistry: {
			address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
		},
		ensReverseRegistrar: {
			address: "0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb",
		},
		ensUniversalResolver: {
			address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
		},
	},
};
