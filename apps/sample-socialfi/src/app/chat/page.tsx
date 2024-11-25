import { Menu } from "@/components/menu";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { USERS } from "@repo/ui-react/fixture";
import React from "react";

const Page = () => {
	return (
		<div className="h-100vh">
			<Menu />
			<div>
				{USERS.map((user) => {
					return (
						<Card>
							<CardHeader>
								<CardTitle>{user.name}</CardTitle>
								<CardDescription>{user.ens}</CardDescription>
							</CardHeader>
							<CardContent>
								<p>{user.description}</p>
							</CardContent>
							<CardFooter>
								<p>{user.address}</p>
							</CardFooter>
						</Card>
					);
				})}
				;
			</div>
		</div>
	);
};

export default Page;
