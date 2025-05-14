import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWalletClient } from "wagmi";
import type { UploadAttestationParams } from "#components/attestations/attestations";
import { createGetAttestationWithUidQueryOptions } from "#hooks/eas/use-get-attestation-with-uid";
import {
	createLighthouseParams,
	getLighthouseGatewayUrl,
	uploadEncryptedFileWithText,
	uploadText,
} from "#lib/filecoin/lighthouse/isomorphic";

export const useUploadAttestationWithLighthouse = ({
	lighthouseApiKey,
}: {
	lighthouseApiKey?: string;
}) => {
	if (!lighthouseApiKey) throw new Error("lighthouseApiKey is required");

	const { data: walletClient } = useWalletClient();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({
			uid,
			payload,
			chainId = 1,
			isEncrypted,
		}: UploadAttestationParams) => {
			if (!walletClient) return;

			if (uid) {
				const queryOptions = createGetAttestationWithUidQueryOptions({
					uid,
					chainId,
				});

				const { data: attestation } =
					await queryClient.fetchQuery(queryOptions);

				if (!attestation.attestation) throw new Error("attestation not found");
				payload = attestation;
			}

			if (!payload) {
				toast.error({
					title: "Error",
					description:
						"At least attestation payload or uid with chain must be present",
				});
				return;
			}
			// default to payload
			const [accountAddress, signedMessage] = await createLighthouseParams({
				account: walletClient.account,
				options: { apiKey: lighthouseApiKey },
			});

			const compiledPayload = { ...payload, chainId };

			if (isEncrypted) {
				const { name, cid } = await uploadEncryptedFileWithText(
					JSON.stringify(compiledPayload),
					lighthouseApiKey,
					accountAddress,
					signedMessage,
				);
				toast.success(`Encrypted Upload Successful for file : ${name}`, {
					description: getLighthouseGatewayUrl(cid),
				});
			} else {
				const { name, cid } = await uploadText(
					JSON.stringify(compiledPayload),
					lighthouseApiKey,
				);
				toast.success(`Upload Successful for file : ${name}`, {
					description: getLighthouseGatewayUrl(cid),
				});
			}
		},
	});

	return { ...mutation };
};
