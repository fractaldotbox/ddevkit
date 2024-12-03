import { UploadAttestationProps } from "@/stories/attestations/UploadAttestation";
import { useMutation } from "@tanstack/react-query";

export function useUploadAttestation() {
  const mutation = useMutation({
    mutationFn: async ({ uid, payload, chainId }: UploadAttestationProps) => {
      if (uid && chainId) {
        return;
      }

      if (!payload) {
        console.error(
          "at least attestation payload or uid with chain must be present",
        );
        return;
      }

      // default to payload
    },
  });

  return { uploadAttestation: mutation.mutateAsync, ...mutation };
}
