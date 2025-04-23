"use client";

import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

interface TestimonialCardProps {
	name: string;
	handle?: string;
	avatar?: string;
	xPost?: string;
	children: React.ReactNode;
}

export function TestimonialCard({
	name,
	handle,
	avatar,
	xPost,
	children,
}: TestimonialCardProps) {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	return (
		<Card className="h-full p-4 hover:bg-accent/50 transition-colors min-h-[200px] max-w-[400px]">
			<CardContent className="p-0">
				<a
					href={`${xPost}`}
					className="no-underline text-white"
					target="_blank"
				>
					<div className="flex items-start gap-3">
						<Avatar className="h-12 w-12">
							<AvatarImage src={avatar} alt={name} />
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="flex flex-col items-start">
								<div className="font-semibold">{name}</div>
								{handle && (
									<div className="mt-[-5px] text-muted-foreground text-slate-500">
										@{handle}
									</div>
								)}
							</div>
							<blockquote className="mt-2 text-foreground">
								{children}
							</blockquote>
						</div>
					</div>
				</a>
			</CardContent>
		</Card>
	);
}
