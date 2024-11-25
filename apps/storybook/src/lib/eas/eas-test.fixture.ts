import {
	AttestationShareablePackageObject,
	NO_EXPIRATION,
	OffchainAttestationVersion,
	SignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";

// https://github.com/wevm/viem/blob/main/src/constants/address.ts#L5

export const ZERO_BYTES = "0x";
export const ZERO_BYTES32 =
	"0x0000000000000000000000000000000000000000000000000000000000000000";

// https://github.com/ethereum-attestation-service/eas-sdk?tab=readme-ov-file#example-creating-onchain-attestations
export const VOTE_SCHEMA_FIXTURE = {
	schemaUID:
		"0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
	schemaString: "uint256 eventId, uint8 voteIndex",
	encodedData: [
		{ name: "eventId", value: 1, type: "uint256" },
		{ name: "voteIndex", value: 1, type: "uint8" },
	],
	data: {
		recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
		expirationTime: NO_EXPIRATION,
		revocable: true,
	},
};

// 	https://sepolia.easscan.org/schema/view/0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7
export const SCHEMA_FIXTURE_MET_IRL = {
	schemaUID:
		"0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7",
	schemaString: "bool metIRL",
	encodedData: [{ name: "metIRL", value: 1, type: "bool" }],
};

// https://sepolia.easscan.org/schema/view/0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a
export const SCHEMA_FIXTURE_IS_A_FRIEND = {
	schemaUID:
		"0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a",
};

export interface Spec {
	attestation: AttestationShareablePackageObject;
	encoded: string;
	encodedFflate: string;
	url: string;
	urlFflate: string;
}

export const TEST_ATTESTATIONS: Spec[] = [
	{
		attestation: {
			sig: {
				version: OffchainAttestationVersion.Version2,
				domain: {
					name: "EAS Attestation",
					version: "1.3.0",
					chainId: 31337n,
					verifyingContract: "0x6f2E42BB4176e9A7352a8bF8886255Be9F3D2d13",
				},
				primaryType: "Attest",
				types: {
					Attest: [
						{ name: "version", type: "uint16" },
						{
							name: "schema",
							type: "bytes32",
						},
						{ name: "recipient", type: "address" },
						{ name: "time", type: "uint64" },
						{
							name: "expirationTime",
							type: "uint64",
						},
						{ name: "revocable", type: "bool" },
						{ name: "refUID", type: "bytes32" },
						{
							name: "data",
							type: "bytes",
						},
						{
							name: "salt",
							type: "bytes32",
						},
					],
				},
				signature: {
					v: 28,
					r: "0x086528faabfc6eafc046c711577b603f0123e79383469abaedd9ff7ce38028fd",
					s: "0x22c1f437874575bf74936a7d1a114c789f2a53e7d986c2c46fa60b6ed43d7351",
				},
				uid: "0x854d8e26b2bbdc3577fc78c6d2f512258fcc9b91a60858985a216c0ef526ee82",
				message: {
					version: OffchainAttestationVersion.Version2,
					schema:
						"0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd",
					recipient: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
					time: 1690299812n,
					expirationTime: 1692891810n,
					revocable: true,
					refUID:
						"0x0000000000000000000000000000000000000000000000000000000000000000",
					data: "0x",
					salt: "0x0000000000000000000000000000000000000000000000000000000000000123",
				},
			},
			signer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
		},
		encoded:
			"eNqlkUtuJTEIRfdS41JkvoZhnpLaRKsH2IYFRImU5cevlAW01ExgAOde4M8BL/TSjvMgIOo7t28tfGd8PBi6pr92Egwbl5kpijzSL3rDBXQ3N1NBq4hRUzNqNtbZAaT3oY2qAVJ2JyNWjxG5llf1mWRtz60bgjihmLp1li6jOjtp9AUBwLObF4ZszHLTiZO1QtvQXExr24PjRHtyivxamgIRy+zSi2dqPMywY/dZdQ1HVL1FTXhZog4cY03ahmtLTV1YAohiNacPhy1lYm4SCDpblqBmGt4QovTmbNRC5giRDQUXJmjJNXLh7i8Tzwm8TwMeK4Ox9e0Vftf/d9ug3tDdAJ8lmoNB24jj/Pz4yifrONuJ92P+J/bTjr8/dNmG8A==",
		encodedFflate:
			"eNqlkUFuJDEIRe9S61JkwGBYTmumLjHKAmM4QJRIOX7cpRwgUtjAAt7/wP8DXuilHedBQDR2bp9S+K/j49FhSNqfQYyu81JVQeZH2kV/cQHdzU2FUct9Vkh6ResSA4DHmNKoGiDlMFLqYj4917KqEUna9ty6IYgB1Wno6Dx41uhG4mOBA/QYaoXOG7NMJTC6lEubkqvT2vbgOFGfnCK7liSD+1K95OqR4g9VHDgsqq5piCK3qHJfmigT51xB23BtqZCFxYDIWhE2DbaUspqyI0i0LEbJVLwhRGnNulJzjunMGwrGnaBlr5kLd38pWwb0fRowX+kd29he4Xv9n9sGsYZmCvgsUQ0U2kYc5/vbRz5Zx9lOvB/zm9hPO16/AHTZhvA=",
		url: "/offchain/url/#attestation=eNqlkUtuJTEIRfdS41JkvoZhnpLaRKsH2IYFRImU5cevlAW01ExgAOde4M8BL%2FTSjvMgIOo7t28tfGd8PBi6pr92Egwbl5kpijzSL3rDBXQ3N1NBq4hRUzNqNtbZAaT3oY2qAVJ2JyNWjxG5llf1mWRtz60bgjihmLp1li6jOjtp9AUBwLObF4ZszHLTiZO1QtvQXExr24PjRHtyivxamgIRy%2BzSi2dqPMywY%2FdZdQ1HVL1FTXhZog4cY03ahmtLTV1YAohiNacPhy1lYm4SCDpblqBmGt4QovTmbNRC5giRDQUXJmjJNXLh7i8Tzwm8TwMeK4Ox9e0Vftf%2Fd9ug3tDdAJ8lmoNB24jj%2FPz4yifrONuJ92P%2BJ%2FbTjr8%2FdNmG8A%3D%3D",
		urlFflate:
			"/offchain/url/#attestation=eNqlkUFuJDEIRe9S61JkwGBYTmumLjHKAmM4QJRIOX7cpRwgUtjAAt7%2FwP8DXuilHedBQDR2bp9S%2BK%2Fj49FhSNqfQYyu81JVQeZH2kV%2FcQHdzU2FUct9Vkh6ResSA4DHmNKoGiDlMFLqYj4917KqEUna9ty6IYgB1Wno6Dx41uhG4mOBA%2FQYaoXOG7NMJTC6lEubkqvT2vbgOFGfnCK7liSD%2B1K95OqR4g9VHDgsqq5piCK3qHJfmigT51xB23BtqZCFxYDIWhE2DbaUspqyI0i0LEbJVLwhRGnNulJzjunMGwrGnaBlr5kLd38pWwb0fRowX%2Bkd29he4Xv9n9sGsYZmCvgsUQ0U2kYc5%2FvbRz5Zx9lOvB%2Fzm9hPO16%2FAHTZhvA%3D",
	},
	{
		attestation: {
			sig: {
				domain: {
					name: "EAS Attestation",
					version: "1.0.0",
					chainId: 31337n,
					verifyingContract: "0x6f2E42BB4176e9A7352a8bF8886255Be9F3D2d13",
				},
				primaryType: "Attest",
				types: {
					Attest: [
						{ name: "version", type: "uint16" },
						{
							name: "schema",
							type: "bytes32",
						},
						{ name: "recipient", type: "address" },
						{ name: "time", type: "uint64" },
						{
							name: "expirationTime",
							type: "uint64",
						},
						{ name: "revocable", type: "bool" },
						{ name: "refUID", type: "bytes32" },
						{
							name: "data",
							type: "bytes",
						},
					],
				},
				signature: {
					v: 27,
					r: "0x657d547ea6cd0833572aad8005d00e38f7ed179ab98f76af03209abc1b547445",
					s: "0x39057cca4f279d3665882bb41087f281f4c82f8bc7289bd8692d1489516bbcfa",
				},
				uid: "0x35bcdfc396e713ace4513fb166b2ac2e5613f12e4aed5d5cdb637051750f6e0b",
				message: {
					version: OffchainAttestationVersion.Version1,
					schema:
						"0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd",
					recipient: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
					time: 1690299812n,
					expirationTime: 1692891810n,
					revocable: true,
					refUID:
						"0x0000000000000000000000000000000000000000000000000000000000000000",
					data: "0x",
				},
			} as unknown as SignedOffchainAttestation,
			signer: "0x8f80b8f45cA0F036da46fFA4D9e5e42D086fB302",
		},
		encoded:
			"eNolkLuKHEEMRf+l42bRu6RwmnH/hHFQDylaHBgv+PNdsxPpXpCO4Pw88AM+4DgPRua2J/yzoh9C1yXYLOPRWKn7uN3dSPXKuPlJC/m9rG2ptOw2FzizNup9OYAugGSvlgtb9BE7Wi9ggt0mjn0lot8QDtA2Z5eiFovN1J3GEARvRY4l06l8zEYeY7nF/i8eijbGrH6c1F4cL4fhJTofcAPb6mJ1P+QZqSn0BLe6GOj9VMdcNTksG3KfKYpcA80G9UmptitSSs+lS+caxg0Um0JZwnhDOANCnKHrHF1VZWGoMEJKjVyUpeUaOVFADKOv7ELQigNrfUN2vJel4suc33bLTOvXdtC2j1l1jyAyO060AIpwpFfcMtARNuI4//75yhfrOOHE8/fX5+ev/ziaeyQ=",
		encodedFflate:
			"eNolkDuKHFEMRfdScTHo/6Swi3Ztwjh4HykaHBgPePl+PR3pCqRz4fw88AM+4DgPRua2J/yzoh9C1yXYLOPRWKn7uN3dSPXKuPlJC/l9rG2ptOw2FzizNup9OYAugGSvlgtb9BE7Wi9ggr1NHPtLRL8hHKBtzi5FLRabqTuNIQjeihxLplP5mI08xnKL3S8eijbGrH6c1F4cL4fhJTofcAPb6mJ1P+QZqSn0BLe6GOhdqmOumhyWDbnPFEWugWaD+qRU2ytSSs+lS+caxg0Um0JZwnhDOANCnKHrHF1VZWGoMEJKjVyUpeUaOVFADKOv7ELQigNrfUN2vJel4suc33bLTOvXdtC2j1l1jyAyO060AIpwpFfcMtARNuI4//75yhfrOOHE8/fX5+ev/ziaeyQ=",
		url: "/offchain/url/#attestation=eNolkLuKHEEMRf%2Bl42bRu6RwmnH%2FhHFQDylaHBgv%2BPNdsxPpXpCO4Pw88AM%2B4DgPRua2J%2Fyzoh9C1yXYLOPRWKn7uN3dSPXKuPlJC%2Fm9rG2ptOw2FzizNup9OYAugGSvlgtb9BE7Wi9ggt0mjn0lot8QDtA2Z5eiFovN1J3GEARvRY4l06l8zEYeY7nF%2Fi8eijbGrH6c1F4cL4fhJTofcAPb6mJ1P%2BQZqSn0BLe6GOj9VMdcNTksG3KfKYpcA80G9UmptitSSs%2BlS%2Bcaxg0Um0JZwnhDOANCnKHrHF1VZWGoMEJKjVyUpeUaOVFADKOv7ELQigNrfUN2vJel4suc33bLTOvXdtC2j1l1jyAyO060AIpwpFfcMtARNuI4%2F%2F75yhfrOOHE8%2FfX5%2Bev%2FziaeyQ%3D",
		urlFflate:
			"/offchain/url/#attestation=eNolkDuKHFEMRfdScTHo%2F6Swi3Ztwjh4HykaHBgPePl%2BPR3pCqRz4fw88AM%2B4DgPRua2J%2Fyzoh9C1yXYLOPRWKn7uN3dSPXKuPlJC%2Fl9rG2ptOw2FzizNup9OYAugGSvlgtb9BE7Wi9ggr1NHPtLRL8hHKBtzi5FLRabqTuNIQjeihxLplP5mI08xnKL3S8eijbGrH6c1F4cL4fhJTofcAPb6mJ1P%2BQZqSn0BLe6GOhdqmOumhyWDbnPFEWugWaD%2BqRU2ytSSs%2BlS%2Bcaxg0Um0JZwnhDOANCnKHrHF1VZWGoMEJKjVyUpeUaOVFADKOv7ELQigNrfUN2vJel4suc33bLTOvXdtC2j1l1jyAyO060AIpwpFfcMtARNuI4%2F%2F75yhfrOOHE8%2FfX5%2Bev%2FziaeyQ%3D",
	},
];
