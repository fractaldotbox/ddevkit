import { TYPED_DATA } from "@geist/domain/signature/type-data.js";
import { useStore } from "@nanostores/react";
import type { MapStore } from "nanostores";
import { ScrollableCodeBlock } from "#components/scrollable-code-block";
import { useSign } from "#hooks/signature/use-sign";
import { type Hex, SignType } from "../../lib/signature/sign";
import { SignatureForm } from "./signature-form";
import { SignatureVerifyBadge } from "./signature-verify-badge";

const { types, primaryType, domain } = TYPED_DATA;

export const SignatureFormMinimal = ({
	privateKey,
	signType = SignType.EIP191,
	$input,
}: {
	privateKey: Hex;
	signType: SignType;
	$input: MapStore;
}) => {
	const { message, signature } = useStore($input);

	const { publicKeyAddress, signMessage, verifyMessage, messageToVerify } =
		useSign({
			privateKey,
			signType,
			$input,
		});

	return (
		<div className="flex flex-row">
			<div className="w-1/2">
				{signType}
				<SignatureForm
					$input={$input}
					signMessage={async (message: string) => {
						return signMessage(message);
					}}
				/>

				<SignatureVerifyBadge
					address={publicKeyAddress}
					message={messageToVerify}
					signature={signature}
					verify={async ({ signature, message, address }) =>
						verifyMessage({ signature, message, address })
					}
				/>
			</div>
			<div>
				{signType === SignType.EIP712 && (
					<div>
						<ScrollableCodeBlock
							title="Message"
							codeObject={messageToVerify.message}
						/>
						<ScrollableCodeBlock
							title="Domain & Types"
							codeObject={{ domain, types }}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
