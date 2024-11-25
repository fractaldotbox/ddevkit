import { addEnsContracts } from "@ensdomains/ensjs";
import { batch, getName } from "@ensdomains/ensjs/public";
import { http, Address, createPublicClient } from "viem";
import { mainnet } from "viem/chains";

export const createEnsClient = () => {
	const client = createPublicClient({
		chain: addEnsContracts(mainnet),
		transport: http(),
	});
	return client;
};

export const getNames = async ({
	addresses = [],
}: { addresses: Address[] }) => {
	const client = createEnsClient();
	const result = await batch(
		client,
		...addresses.map((address) => {
			return getName.batch({ address });
		}),
	);

	return result;
};
