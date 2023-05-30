import { notFound } from "next/navigation";
import { isValidDomain } from "@/utils/utils";
import Breadcrumbs from "@/components/Breadcrumbs";

const Domain = async ({ params }: { params: any }) => {
	await new Promise((resolve) => setTimeout(resolve, 4000));
	const { domain } = params;
	if (!isValidDomain(domain)) notFound();

	return (
		<>
			<Breadcrumbs />
			<h1>{JSON.stringify(params, null, 4)}</h1>
			<h1>Domain {isValidDomain(domain) ? "Valid " : "Invalid"}</h1>
		</>
	);
};

export default Domain;
