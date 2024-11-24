import * as ucans from "@ucans/ucans";
import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { Address } from "viem";

const tokenAtom = atom("");

export const UCANForm = ({
	privateKey,
}: {
	privateKey: string;
}) => {
	const [token, setToken] = useAtom(tokenAtom);

	// TODO align did with key
	const paramsAtom = atom((get) => {
		return {
			audience: "did:key:zabcde...", // recipient DID
			// issuer: keyPair, // signing key
			capabilities: [
				// permissions for ucan
				{
					with: {
						scheme: "wnfs",
						hierPart: "//boris.fission.name/public/photos/",
					},
					can: { namespace: "wnfs", segments: ["OVERWRITE"] },
				},
				{
					with: {
						scheme: "wnfs",
						hierPart:
							"//boris.fission.name/private/6m-mLXYuXi5m6vxgRTfJ7k_xzbmpk7LeD3qYt0TM1M0",
					},
					can: { namespace: "wnfs", segments: ["APPEND"] },
				},
				{
					with: { scheme: "mailto", hierPart: "boris@fission.codes" },
					can: { namespace: "msg", segments: ["SEND"] },
				},
			],
		};
	});

	const params = useAtomValue(paramsAtom);

	useEffect(() => {
		(async () => {
			// workaround before we can import static key
			const keyPair = await ucans.EcdsaKeypair.create();
			const ucan = await ucans.build({
				...params,
				issuer: keyPair,
			});
			setToken(ucans.encode(ucan)); // base64 jwt-formatted auth token
		})();
	}, []);

	return (
		<div>
			<pre>{JSON.stringify(token)}</pre>
			<pre>{JSON.stringify(params, null, 4)}</pre>
		</div>
	);
};
