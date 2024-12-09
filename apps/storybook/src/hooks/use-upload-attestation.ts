import {
  createLighthouseParams,
  getLighthouseGatewayUrl,
  uploadEncryptedFileWithText,
  uploadText,
} from "@/lib/filecoin/lighthouse/isomorphic";
import { UploadAttestationParams } from "@/stories/attestations/attestations";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";
import { useToast } from "./use-toast";

const lighthouseApiKey = import.meta.env.VITE_LIGHTHOUSE_API_KEY as string;

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

      console.log("uploading...");

      // if (uid && chainId && !payload) {

      //   const payload =

      //   return;
      // }

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
          options: { apiKey: lighthouseApiKey },
        });
      if (isEncrypted) {
        const { name, cid } = await uploadEncryptedFileWithText(
          JSON.stringify(payload),
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
        const { name, cid } = await uploadText(JSON.stringify(payload), apiKey);

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

  return { uploadAttestation: mutation.mutateAsync, ...mutation };
}
