import mainnetEAS from "@ethereum-attestation-service/eas-contracts/deployments/mainnet/EAS.json" assert {
	type: "json",
};
import { base, mainnet, optimism } from "viem/chains";

import optimismEIP712 from "@ethereum-attestation-service/eas-contracts/deployments/optimism/EIP712Proxy.json" assert {
	type: "json",
};

import baseEIP712 from "@ethereum-attestation-service/eas-contracts/deployments/base/EIP712Proxy.json" assert {
	type: "json",
};

// consider loading directory
const buildEasConfig = () => {
	console.log("buildEasConfig");
	console.log(mainnetEAS.address);

	// TODO graphqlEndpoint
	const config = {
		[mainnet.id]: {
			eas: mainnetEAS.address,
			// schemaRegistry
		},
		[base.id]: {
			address: baseEIP712.address,
		},
		[optimism.id]: {
			address: optimismEIP712.address,
		},
	};
	console.log("config", config);
};
buildEasConfig();
