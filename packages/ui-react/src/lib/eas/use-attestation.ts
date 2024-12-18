import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useEthersSigner } from "../wagmi-utils";

export const useAttestation = () => {
	const signer = useEthersSigner();

	const signAttestation = async () => {
		console.log("TODO signAttestation");
	};

	return {
		signAttestation,
	};
};
