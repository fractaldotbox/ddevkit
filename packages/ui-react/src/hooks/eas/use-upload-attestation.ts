import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWalletClient } from "wagmi";
import { UploadAttestationParams } from "#components/attestations/attestations";
import { createGetAttestationWithUidQueryOptions } from "#hooks/eas/get-attestation-with-uid";
import { useToast } from "#hooks/shadcn/use-toast";
import {
	createLighthouseParams,
	getLighthouseGatewayUrl,
	uploadEncryptedFileWithText,
	uploadText,
} from "#lib/filecoin/lighthouse/isomorphic";

export function useUploadAttestationWithLighthouse({
	lighthouseApiKey,
}: {
	lighthouseApiKey?: string;
}) {
	if (!lighthouseApiKey) throw new Error("lighthouseApiKey is required");

	const { data: walletClient } = useWalletClient();
	const queryClient = useQueryClient();
	const { toast } = useToast();

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
				toast({
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
				toast({
					title: `Encrypted Upload Successful for file : ${name}`,
					description: getLighthouseGatewayUrl(cid),
				});
			} else {
				const { name, cid } = await uploadText(
					JSON.stringify(compiledPayload),
					lighthouseApiKey,
				);
				toast({
					title: `Upload Successful for file : ${name}`,
					description: getLighthouseGatewayUrl(cid),
				});
			}
		},
	});

	return { ...mutation };
}
