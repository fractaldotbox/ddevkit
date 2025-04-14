import type { AddressOrEns } from "#hooks/ens/efp";
import { useEnsData } from "#hooks/ens/use-efp-api";

export const Name = ({ addressOrEns }: { addressOrEns: AddressOrEns }) => {
	const { data, isSuccess } = useEnsData(addressOrEns);
	const name = data?.ens?.name;
	return <div data-testid="name">{name}</div>;
};
