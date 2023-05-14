"use client";
import { classNames } from "@/utils/class";

export function Prose({
	as: Component = "div",
	className,
	enable = true,
	...props
}: ProseProps) {
	return (
		<Component
			className={classNames(
				className,
				enable ? "prose dark:prose-invert" : "not-prose"
			)}
			{...props}
		/>
	);
}
