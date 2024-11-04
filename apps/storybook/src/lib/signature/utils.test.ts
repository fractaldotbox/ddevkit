import { ethers } from "ethers";
import {
	Address,
	Hex,
	hashMessage,
	hashTypedData,
	recoverAddress,
	recoverMessageAddress,
	verifyMessage,
} from "viem";
import { generatePrivateKey } from "viem/accounts";
import { describe, expect, test } from "vitest";

describe("Signature Verification Tests", () => {
	// Generate a consistent private key for testing
	const TEST_PRIVATE_KEY = generatePrivateKey();

	test("should verify ethers signature using viem", async () => {
		// Create wallet using ethers
		const wallet = new ethers.Wallet(TEST_PRIVATE_KEY);
		const message = "Hello World";

		// Sign message using ethers
		const signature = await wallet.signMessage(message);
		console.log("Signature:", signature);

		// Verify using viem
		const isValid = await verifyMessage({
			address: wallet.address as Address,
			message: message,
			signature: signature as Hex,
		});

		expect(isValid).toBe(true);

		// Recover address using viem and compare
		const recoveredAddress = await recoverMessageAddress({
			message: message,
			signature: signature as Hex,
		});

		expect(recoveredAddress.toLowerCase()).toBe(wallet.address.toLowerCase());
	});

	test("should verify structured data signature", async () => {
		const wallet = new ethers.Wallet(TEST_PRIVATE_KEY);

		// Define the typed data
		const domain = {
			name: "Test App",
			version: "1",
			chainId: 1,
			verifyingContract:
				"0x0000000000000000000000000000000000000000" as Address,
		};

		const types = {
			Person: [
				{ name: "name", type: "string" },
				{ name: "age", type: "uint256" },
			],
		};

		const primaryType = "Person";

		const value = {
			name: "Alice",
			age: 25,
		};

		// Sign using ethers
		const signature = (await wallet.signTypedData(domain, types, value)) as Hex;

		// Hash the typed data
		const hash = hashTypedData({ domain, types, primaryType, message: value });

		// // Recover the address
		const recoveredAddress = await recoverAddress({ hash, signature });

		// // Verify the recovered address matches the expected address
		expect(recoveredAddress).toBe(wallet.address);
	});

	// test("should handle different message formats", async () => {
	// 	const wallet = new ethers.Wallet(TEST_PRIVATE_KEY);

	// 	// Test cases with different message formats
	// 	const testCases = [
	// 		{ message: "Simple text" },
	// 		{ message: "👋 Hello with emoji" },
	// 		{ message: "Multi\nline\ntext" },
	// 		{ message: "0x1234" }, // Hex string
	// 		{ message: " Spaces at ends " },
	// 	];

	// 	for (const { message } of testCases) {
	// 		// Sign with ethers
	// 		const signature = await wallet.signMessage(message);

	// 		// Verify with viem
	// 		const isValid = await verifyMessage({
	// 			address: wallet.address,
	// 			message: message,
	// 			signature: signature,
	// 		});

	// 		expect(isValid).toBe(true);
	// 	}
	// });

	// test("should handle malformed signatures", async () => {
	// 	const wallet = new ethers.Wallet(TEST_PRIVATE_KEY);
	// 	const message = "Test message";

	// 	// Get valid signature first
	// 	const validSignature = await wallet.signMessage(message);

	// 	// Test invalid signature formats
	// 	const invalidSignatures = [
	// 		validSignature.slice(0, -2), // Truncated signature
	// 		validSignature.slice(2), // No 0x prefix
	// 		"0x" + validSignature.slice(2) + "00", // Extra byte
	// 		"0x1234", // Too short
	// 		validSignature.replace("1", "2"), // Modified byte
	// 	];

	// 	for (const invalidSig of invalidSignatures) {
	// 		try {
	// 			await verifyMessage({
	// 				address: wallet.address,
	// 				message: message,
	// 				signature: invalidSig,
	// 			});
	// 			// If we get here, the test should fail
	// 			expect(false).toBe(true);
	// 		} catch (error) {
	// 			// Expected to throw error
	// 			expect(error).toBeDefined();
	// 		}
	// 	}
	// });

	// test("should verify hashed message", async () => {
	// 	const wallet = new ethers.Wallet(TEST_PRIVATE_KEY);
	// 	const message = "Hello World";

	// 	// Hash and sign message using ethers
	// 	const messageHash = ethers.hashMessage(message);
	// 	const signature = await wallet.signMessage(message);

	// 	// Verify using viem's hashMessage
	// 	const viemMessageHash = hashMessage(message);
	// 	expect(messageHash.toLowerCase()).toBe(viemMessageHash.toLowerCase());

	// 	// Recover address from hashed message
	// 	const recoveredAddress = await recoverMessageAddress({
	// 		message: message,
	// 		signature: signature,
	// 	});

	// 	expect(recoveredAddress.toLowerCase()).toBe(wallet.address.toLowerCase());
	// });
});
