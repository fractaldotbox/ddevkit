"use client";

import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

interface TestimonialCardProps {
	name: string;
	handle?: string;
	avatar?: string;
	children: React.ReactNode;
}

export function TestimonialCard({
	name,
	handle,
	avatar,
	children,
}: TestimonialCardProps) {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	return (
		<Card className="h-full p-4 hover:bg-accent/50 transition-colors">
			<CardContent className="p-0">
				<div className="flex items-start gap-3">
					<Avatar className="h-12 w-12">
						<AvatarImage src={avatar} alt={name} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<div className="flex items-center gap-1">
							<span className="font-semibold">{name}</span>
							{handle && (
								<span className="text-muted-foreground">@{handle}</span>
							)}
						</div>
						<blockquote className="mt-2 text-foreground">{children}</blockquote>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
