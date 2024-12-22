import { AddressBadge } from "@geist/ui-react/components/identity/address-badge";
import { privateKeyToAccount } from "viem/accounts";

export const withWalletControl = () => {
	return (Story: any, context: any) => {
		const { privateKey } = context?.args;
		const account = privateKeyToAccount(privateKey);
		const { address } = account;

		return (
			<div>
				<AddressBadge address={address} />
				<div className="p-10">
					<Story args={context.args} />
				</div>
			</div>
		);
	};
};

export const withWalletControlWagmi = () => {
	return (Story: any, context: any) => {
		const { account } = context?.args;

		const { address } = account;

		return (
			<div className="w-full top-0">
				<div className="float-right">
					{address && <AddressBadge address={address} />}
				</div>
				<div className="p-10">
					<Story args={context.args} />
				</div>
			</div>
		);
	};
};
