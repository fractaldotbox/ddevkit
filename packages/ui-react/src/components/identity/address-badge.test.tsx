import { AddressBadge } from "@repo/ui-react/components/identity/address-badge";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock(import("viem"), async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		getAddress: vi.fn((address) => address),
	};
});

// Mock the Lucide React icons
vi.mock("lucide-react", () => ({
	Check: () => <div>check-icon</div>,
	Copy: () => <div>copy-icon</div>,
}));

describe("Address Component", () => {
	const _windowNavigator = window.navigator;
	const mockAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

	beforeEach(() => {
		vi.useFakeTimers();

		window.navigator = {
			clipboard: {
				writeText: vi.fn(),
			} as any,
		} as any;
	});

	afterEach(() => {
		window.navigator = _windowNavigator;
	});

	it("renders short address by default", () => {
		render(<AddressBadge address={mockAddress} />);
		expect(screen.getByText(`0x742d...f44e`)).toBeDefined();
	});

	it("renders full address when isFull is true", () => {
		render(<AddressBadge address={mockAddress} isFull={true} />);
		expect(screen.getByText(mockAddress)).toBeDefined();
	});

	it("displays copy icon by default", () => {
		render(<AddressBadge address={mockAddress} />);
		expect(screen.getByText("copy-icon")).toBeDefined();
	});

	it("copies address and shows check icon when clicked", async () => {
		render(<AddressBadge address={mockAddress} />);
		const copyButton = screen.getByTestId("tooltip-trigger");
		const navigatorSpy = vi.spyOn(navigator.clipboard, "writeText");

		fireEvent.click(copyButton);

		expect(navigatorSpy).toHaveBeenCalledWith(mockAddress);
		expect(screen.getByText("check-icon")).toBeDefined();

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(screen.getByText("copy-icon")).toBeDefined();
	});

	it("displays correct tooltip content", () => {
		render(<AddressBadge address={mockAddress} />);
		expect(screen.findByText("Click to copy")).toBeDefined();

		fireEvent.click(screen.getByTestId("tooltip-trigger"));
		expect(screen.findByText("Copied!")).toBeDefined();
	});
});
