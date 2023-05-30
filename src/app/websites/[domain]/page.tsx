import { notFound } from "next/navigation";
import { isValidDomain, nFormatter } from "@/utils/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LoadingDots } from "@/components/animation/Loading";
import Link from "next/link";
import DomainCard from "@/components/websites/DomainCard";

const Domain = async ({ params }: { params: any }) => {
	// await new Promise((resolve) => setTimeout(resolve, 4000));
	const { domain } = params;
	if (!isValidDomain(domain)) notFound();

	return (
		<>
			<Breadcrumbs />
			<DomainCard domain={domain} />
		</>
	);
};

export default Domain;
