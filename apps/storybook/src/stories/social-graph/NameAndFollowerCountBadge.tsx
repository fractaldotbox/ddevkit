import { AddressOrEns, useEnsData, useUserStats } from "@/hooks/use-efp-api";
import { Text } from "@radix-ui/themes";
import { Card, CardContent } from "@/components/ui/card"

import { useEffect, useState } from "react";

export type NameWithEfpFollowerCount = { name: string, followers: number };

export const NameAndFollowerCountBadge = ({ addressOrEns }: { addressOrEns: AddressOrEns }) => {
    const [nameWithFollowerCount, setNameWithFollowerCount] = useState<NameWithEfpFollowerCount>();

    const ensQuery = useEnsData(addressOrEns);
    const userStatsQuery = useUserStats(addressOrEns);

    // consider extracted as common hook but ensure treeshaking
    useEffect(() => {
        if (!ensQuery.isSuccess || !userStatsQuery.isSuccess) return;
        ; (async () => {
            const name = ensQuery.data.ens.records.name ?? ensQuery.data.ens.name;
            const followers = parseInt(userStatsQuery.data.followers_count);

            setNameWithFollowerCount({ name, followers });
        })();
    }, [ensQuery.isSuccess, userStatsQuery.isSuccess]);

    return (
        <Card className="w-32 h-16">
            <CardContent className="p-2">
                <Text as="div" size="2" weight="bold">
                    { nameWithFollowerCount?.name }
                </Text>
                <Text as="div" size="2" color="gray">
                    { nameWithFollowerCount?.followers ? `${nameWithFollowerCount.followers} followers` : '' }
                </Text>
            </CardContent>
        </Card>
    )
}
