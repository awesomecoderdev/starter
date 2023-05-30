import { Code, CodeGroup } from "@/components/Code";
import { Prose } from "@/components/Prose";
import { PageNotFoundAnimation } from "@/components/animation/Lottie";
import Link from "next/link";

export default function NotFound(props: any) {
	return (
		<Prose>
			<div className="flex items-center">
				<div className="w-72">
					<PageNotFoundAnimation />
				</div>
			</div>
		</Prose>
	);
}
