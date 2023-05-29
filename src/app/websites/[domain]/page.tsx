import { notFound } from "next/navigation";
import { isValidDomain } from "@/utils/utils";
import Breadcrumbs from "@/components/Breadcrumbs";

const Domain = ({ params }: { params: any }) => {
	const { domain } = params;
	if (!isValidDomain(domain)) notFound();

	return (
		<>
			<Breadcrumbs />
			<h1>{JSON.stringify(params, null, 4)}</h1>
			<h1>Domain {isValidDomain(domain) ? "Valid " : "Invalid"}</h1>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
			adipisci, ut dolorum mollitia, consectetur sed eos excepturi,
			perferendis esse voluptatem consequatur atque est odio officiis
			quibusdam! Quibusdam earum accusamus doloremque.
		</>
	);
};

export default Domain;
