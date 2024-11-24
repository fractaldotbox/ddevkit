"use client";
import {
	Address,
	Attestation,
	Avatar,
	Badge,
	Identity,
	Name,
	getAttestations,
	useAttestations,
} from "@coinbase/onchainkit/identity";
import { Hex } from "viem";
import { base } from "viem/chains";

import { useEthersProvider } from "@/wagmi-adapter";
import {
	EAS,
	Offchain,
	SchemaEncoder,
} from "@ethereum-attestation-service/eas-sdk";
import { useEffect, useState } from "react";

// https://github.com/ethereum-attestation-service/eas-contracts
// base
const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021";

const COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID =
	"0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9";

const Attest = ({
	eas,
}: {
	eas: EAS;
}) => {
	return (
		<div>
			<button
				onClick={async () => {
					console.log("attest");

					const offchain = await eas.getOffchain();

					// offchain.signTypedDataRequest();
				}}
			>
				Attest
			</button>
		</div>
	);
};

const Page = () => {
	const address = "0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9" as Hex;
	const [eas, setEas] = useState<EAS | null>(null);
	const provider = useEthersProvider({
		chainId: base.id,
	});
	const attestations =
		useAttestations({
			address,
			chain: base,
			schemaId: COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
		}) || [];

	useEffect(() => {
		if (!provider) {
			return;
		}
		// Initialize EAS with the EAS contract address on whichever chain where your schema is defined
		const eas = new EAS(EAS_CONTRACT_ADDRESS);
		eas.connect(provider);
		setEas(eas);
	}, [provider]);

	console.log("data", attestations);

	return (
		<div>
			<Identity
				address={address}
				schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
			>
				<Avatar />
				<Name>
					<Badge />
				</Name>
				<Address />
			</Identity>

			<h1>Attestations</h1>

			<div>
				{attestations.map((attestation: Attestation) => (
					<div>
						{attestation.schemaId}
						{attestation.attester}
					</div>
				))}
			</div>

			<button>Make an attestation</button>
			{eas && <Attest eas={eas} />}
		</div>
	);
};

export default Page;
