import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Address, Hex } from "viem";
import { AddressBadge } from "#components/identity/address-badge";
import { Label } from "#components/shadcn/label";
export const SignatureVerifyBadge = ({
	signature,
	message,
	address,
	verify,
}: {
	signature: Hex;
	message: any;
	address: Address;
	verify: ({
		address,
		message,
		signature,
	}: {
		address: Address;
		message: any;
		signature: Hex;
	}) => Promise<boolean>;
}) => {
	const [isVerified, setIsVerified] = useState(false);
	useEffect(() => {
		if (!signature || !message || !address) {
			return;
		}

		verify({ signature, message, address }).then((isVerified: boolean) => {
			setIsVerified(isVerified);
		});
	}, [signature, message, address]);

	return (
		<div>
			<div className="flex items-center space-x-2">
				<Label htmlFor="public-key">Public Key</Label>
				<div id="public-key">
					<AddressBadge address={address} />
				</div>
			</div>
			<div className="font-xs break-all">Signature: {signature} </div>
			<Flex align="center" gap="2">
				{isVerified ? "✅Verified!" : ""}
			</Flex>
		</div>
	);
};
