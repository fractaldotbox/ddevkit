import config from "@geist/domain/config";
import { Loader2, Upload } from "lucide-react";
import { Button } from "#components/shadcn/button";
import { useUploadAttestationWithLighthouse } from "#hooks/eas/use-upload-attestation";
import type { UploadAttestationParams } from "./attestations";

// this is a controlled component that depends on an external state
export const UploadAttestation = (props: UploadAttestationParams) => {
	const { mutateAsync: uploadAttestation, isPending } =
		useUploadAttestationWithLighthouse({
			lighthouseApiKey: config.lighthouse.apiKey,
		});

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
};
