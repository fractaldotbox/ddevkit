import { createEnsPublicClient } from "@ensdomains/ensjs";
import { useDecodedName } from "@ensdomains/ensjs-react";
import { ClientWithEns } from "@ensdomains/ensjs/contracts";
import { createWalletClient, custom } from "viem";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { useWalletClient } from "wagmi";

const Page = () => {
	// use official way to get client
	const client = createEnsPublicClient({
		chain: mainnet,
		transport: http(),
	}) as ClientWithEns;

	const data = useDecodedName({
		name: "debuggingfuture.eth",
		client,
	});

	return (
		<div>
			<button>Set Record</button>
		</div>
	);
};

export default Page;
