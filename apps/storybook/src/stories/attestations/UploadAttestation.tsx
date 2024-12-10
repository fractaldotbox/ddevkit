import { Button } from "@/components/ui/button";
import { useUploadAttestationWithEasSDK } from "@/hooks/use-upload-attestation";
import { Loader2, Upload } from "lucide-react";
import { UploadAttestationParams } from "./attestations";

// this is a controlled component that depends on an external state
export function UploadAttestation(props: UploadAttestationParams) {
  const { mutateAsync: uploadAttestation, isPending } =
    useUploadAttestationWithEasSDK();

  return (
    <Button
      className="flex gap-2 items-center"
      onClick={() => uploadAttestation(props)}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Upload className="w-4 h-4" />
      )}
      Upload Attestation
    </Button>
  );
}
