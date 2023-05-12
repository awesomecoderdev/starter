"use client";
import { classNames } from "@/utils/class";

export function Prose({
	as: Component = "div",
	className,
	...props
}: ProseProps) {
	return (
		<Component
			className={classNames(className, "prose dark:prose-invert")}
			{...props}
		/>
	);
}
