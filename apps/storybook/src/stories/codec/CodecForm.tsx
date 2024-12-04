import { Input } from "@/components/ui/input";
import { base16 as base16S, base64 as base64S } from "@scure/base";
import { Atom, atom, useAtom } from "jotai";
import { base16 } from "multiformats/bases/base16";
import { base64 } from "multiformats/bases/base64";
import { CID, MultibaseEncoder } from "multiformats/cid";
import * as json from "multiformats/codecs/json";
import { sha256 } from "multiformats/hashes/sha2";
import { Suspense, useEffect, useMemo, useState } from "react";

import { Label } from "@/components/ui/label";

const MULTI_ENCODER_BY_CODEC = {
	["multibase64"]: base64.encoder,
	["multibase16"]: base16.encoder,
} as Record<string, MultibaseEncoder<string>>;

const ENCODE_BY_CODEC = {
	base64: base64S.encode,
	base16: base16S.encode,
} as Record<string, any>;

const CodecOutput = ({
	codec,
	output,
	isMultibase = true,
}: {
	codec: string;
	output: string | CID | null;
	isMultibase?: boolean;
}) => {
	const cidExplorerUrl = useMemo(() => {
		return `https://cid.ipfs.tech/#${output}`;
	}, [output]);

	return (
		<div>
			<Label htmlFor="output1">codec: {codec}</Label>
			<div id="output1">
				{isMultibase ? (
					<a href={cidExplorerUrl} target="_blank">
						{output?.toString()}
					</a>
				) : (
					<pre>{output?.toString()}</pre>
				)}
			</div>
		</div>
	);
};

export const CodecForm = ({
	inputAtom,
	codecAtom,
}: {
	inputAtom: ReturnType<typeof atom<string>>;
	codecAtom: ReturnType<typeof atom<string>>;
}) => {
	const [input, setInput] = useAtom(inputAtom);
	const [codec] = useAtom(codecAtom);

	const encoder = MULTI_ENCODER_BY_CODEC[codec];

	const [cid, setCid] = useState(null as CID | null);
	const [output, setOutput] = useState("");
	const codecSimple = codec.replace("multi", "");
	const encode = ENCODE_BY_CODEC[codecSimple];
	const message = useMemo(() => {
		return {
			message: input,
		};
	}, [input]);

	const [output2, setOutput2] = useState("");
	// TODO agnoistic useAtom
	useEffect(() => {
		(async () => {
			const bytes = json.encode(message);
			const hash = await sha256.digest(bytes);
			const cid = CID.create(1, json.code, hash);
			setCid(cid);
			const output = cid.toString(encoder);
			setOutput(output);
		})();

		if (!cid) return;

		const output2 = encode(cid.bytes);
		setOutput2(output2);
	}, [input]);

	return (
		<div>
			<h1>CodecForm</h1>
			<div>
				<Input
					placeholder="message"
					onChange={(e) => {
						setInput(e.target.value);
					}}
				/>
			</div>
			<div>
				<pre>{JSON.stringify(message)}</pre>
			</div>
			<div>
				<CodecOutput codec={"cid"} output={cid} />
				<CodecOutput codec={codec} output={output} />
				<CodecOutput codec={codecSimple} output={output2} isMultibase={false} />
			</div>
		</div>
	);
};
