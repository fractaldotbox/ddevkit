import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#components/shadcn/card";
import { Skeleton } from "#components/shadcn/skeleton";
import {
	getScoreWithAddress,
	getStampsByAddress,
	getStampsMetadata,
	getStampsWithScorerIdAddress,
} from "#lib/passport/api";
import { getShortAddress } from "#lib/utils/address";

import { Logo } from "./logo";

import { useMemo } from "react";
import type { Address } from "viem";
import AddressBadge from "#components/identity/address-badge";
import { cn } from "#lib/shadcn/utils";

interface PassportScoreCardProps {
	address: Address;
	passportParams:
		| {
				model: string;
		  }
		| {
				scorerId: number;
		  };
	className?: string;
}

export const PassportStamps = ({
	stamps,
	metadatas,
}: {
	stamps: { key: string; score: number }[];
	metadatas?: { id: string; icon: string; name: string; description: string }[];
}) => {
	return (
		<div>
			{stamps.map(({ key, score }) => {
				const metadata = metadatas?.find(({ name }) => name === key);

				return (
					<div className="flex flex-row gap-2 justify-between min-w-[200px]">
						<div>{metadata?.description}</div>
						<div>{score}</div>
					</div>
				);
			})}
		</div>
	);
};

export const PassportScoreCard = ({
	address,
	passportParams,
	className,
}: PassportScoreCardProps) => {
	const { data, isSuccess, error } = useQuery({
		queryKey: ["passport-score", address, passportParams],
		queryFn: async () => {
			if ("model" in passportParams) {
				const result = await getScoreWithAddress(address);
				return {
					totalScore: result.details.models[passportParams.model].score,
					stamps: [],
				};
			}

			const result = await getStampsWithScorerIdAddress(
				address,
				passportParams.scorerId,
			);

			const { score, threshold } = result;

			const stamps = Object.entries(result.stamps).map(([key, stamp]) => {
				return {
					key,
					score: Number(stamp.score),
					expirationData: stamp.expiration_date,
				};
			});

			// TODO fix type
			return {
				totalScore: Number(score),
				stamps,
			};
		},
		enabled: !!address,
	});

	const { data: stampMetadata } = useQuery({
		queryKey: ["passport-stamp-metadata", address, passportParams],
		queryFn: async () => {
			const results = await getStampsMetadata();

			return results
				.map(({ groups }) => {
					return groups.flatMap((group) => group.stamps);
				})
				.flat();
		},
		enabled: !!passportParams.scorerId,
	});

	return (
		<Card className={cn("w-full max-w-md", className)}>
			<CardHeader>
				<CardTitle>
					<div className="flex flex-row items-center gap-2">
						<Logo></Logo>
						<AddressBadge address={address} />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{!isSuccess ? (
						<>
							<Skeleton className="h-4 w-48" />
							<Skeleton className="h-4 w-48" />
						</>
					) : (
						<div>
							<div className="flex items-center justify-center">
								<span
									className="text-2xl font-bold"
									data-testid="passport-score-card-score"
								>
									{data?.totalScore.toFixed(2)}
								</span>
							</div>
							<div className="space-y-2  mt-4">
								<div className="space-y-1" data-testid="">
									{data?.stamps?.length > 0 && (
										<PassportStamps
											stamps={data?.stamps}
											metadatas={stampMetadata}
										/>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
