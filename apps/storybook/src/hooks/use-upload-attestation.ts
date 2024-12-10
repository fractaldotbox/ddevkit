import {
  createLighthouseParams,
  getLighthouseGatewayUrl,
  uploadEncryptedFileWithText,
  uploadText,
} from "@/lib/filecoin/lighthouse/isomorphic";
import { UploadAttestationParams } from "@/stories/attestations/attestations";
import { useMutation } from "@tanstack/react-query";
import { useWalletClient } from "wagmi";
import { useToast } from "./use-toast";
import { getAttestationByUid } from "@/lib/eas/get-attestation-from-uid";

const LIGHTHOUSE_API_KEY =
  import.meta.env.VITE_LIGHTHOUSE_API_KEY ||
  import.meta.env.LIGHTHOUSE_API_KEY! ||
  import.meta.env.STORYBOOK_LIGHTHOUSE_API_KEY;

export function useUploadAttestationWithEasSDK() {
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({
      uid,
      payload,
      chainId,
      isEncrypted,
    }: UploadAttestationParams) => {
      if (!walletClient) return;

      if ((uid || "").length > 0) {
        const attestation = await getAttestationByUid(uid!);
        payload = attestation;
      }

      if (!payload) {
        console.error(
          "at least attestation payload or uid with chain must be present",
        );
        return;
      }
      // default to payload
      const [apiKey, accountAddress, signedMessage] =
        await createLighthouseParams({
          account: walletClient.account,
          options: { apiKey: LIGHTHOUSE_API_KEY },
        });

      const compiledPayload = { ...payload, chainId };

      if (isEncrypted) {
        const { name, cid } = await uploadEncryptedFileWithText(
          JSON.stringify(compiledPayload),
          apiKey,
          accountAddress,
          signedMessage,
        );

        console.log({
          title: `Encrypted Upload Successful for file : ${name}`,
          description: getLighthouseGatewayUrl(cid),
        });

        toast({
          title: `Encrypted Upload Successful for file : ${name}`,
          description: getLighthouseGatewayUrl(cid),
        });
      } else {
        const { name, cid } = await uploadText(
          JSON.stringify(compiledPayload),
          apiKey,
        );

        console.log({
          title: `Upload Successful for file : ${name}`,
          description: getLighthouseGatewayUrl(cid),
        });

        toast({
          title: `Upload Successful for file : ${name}`,
          description: getLighthouseGatewayUrl(cid),
        });
      }
    },
  });

  return { ...mutation };
}
