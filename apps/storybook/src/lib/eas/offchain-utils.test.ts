import {
	createOffchainURL as createOffchainURLSdk,
	decodeBase64ZippedBase64,
	EAS,
	Offchain,
	SignedOffchainAttestation,
	ZERO_ADDRESS,
	zipAndEncodeToBase64 as zipAndEncodeToBase64Sdk,
} from "@ethereum-attestation-service/eas-sdk";
import { describe, test, expect } from "vitest";
import { Spec, TEST_ATTESTATIONS } from "./eas-test.fixture";
import { createOffchainURL, zipAndEncodeToBase64 } from "./offchain-utils";
// import { createOffchainURL, zipAndEncodeToBase64 } from './offchain/offchain';

// use fixture
describe.skip("offchain utils eas-sdk", () => {
	describe.each(TEST_ATTESTATIONS)(
		"encode v$attestation.sig.message.version",
		(spec: Spec) => {
			const { attestation, encoded, url } = spec;

			test("should encode into a URL", () => {
				expect(createOffchainURLSdk(attestation)).to.equal(url);
			});

			describe("decode", () => {
				test("should unzip and decode an an encoded attestation string", () => {
					const decoded = decodeBase64ZippedBase64(encoded);
					expect(decoded).to.not.be.null;

					const offchain = new Offchain(
						{
							chainId: attestation.sig.domain.chainId,
							address: attestation.sig.domain.verifyingContract,
							version: attestation.sig.domain.version,
						},
						attestation.sig.message.version,
						new EAS(ZERO_ADDRESS),
					);

					expect(
						offchain.verifyOffchainAttestationSignature(
							attestation.signer,
							decoded.sig as SignedOffchainAttestation,
						),
					).to.be.true;
				});
			});
		},
	);
});

describe("offchain no sdk", () => {
	describe.each(TEST_ATTESTATIONS)(
		"encode v$attestation.sig.message.version",
		(spec: Spec) => {
			const { attestation, encoded, encodedFflate, url, urlFflate } = spec;
			test("should zip and encode an offchain attestation object", () => {
				expect(zipAndEncodeToBase64Sdk(attestation)).to.equal(encoded);
				const newEncoded = zipAndEncodeToBase64(attestation);

				expect(newEncoded).to.equal(encodedFflate);
				// different output although same zlib
				expect(newEncoded).not.to.equal(encoded);
			});

			test("should encode into a URL", () => {
				expect(createOffchainURL(attestation)).to.equal(urlFflate);
				expect(createOffchainURLSdk(attestation)).to.equal(url);
			});

			test("should unzip and decode an an encoded attestation string", () => {
				const decoded = decodeBase64ZippedBase64(encodedFflate);
				expect(decoded).to.not.be.null;

				const offchain = new Offchain(
					{
						chainId: attestation.sig.domain.chainId,
						address: attestation.sig.domain.verifyingContract,
						version: attestation.sig.domain.version,
					},
					attestation.sig.message.version,
					new EAS(ZERO_ADDRESS),
				);

				expect(
					offchain.verifyOffchainAttestationSignature(
						attestation.signer,
						decoded.sig as SignedOffchainAttestation,
					),
				).to.be.true;
			});
		},
	);
});
