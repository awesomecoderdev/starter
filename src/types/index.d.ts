type LayoutComponentsProps = {
	children: React.ReactNode | any;
	sections?: Section[];
};
type ProseProps = {
	children: React.ReactNode;
	className?: string;
	as?: any;
	enable?: boolean;
};

interface MobileNavigationState {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

type SectionProviderProps = {
	children: React.ReactNode;
	sections?: React.ReactNode | any;
};

type Section = {
	id: string;
	title?: string;
	headingRef?: React.RefObject<HTMLElement>;
	offsetRem?: number;
};

interface SectionProviderState {
	sections: Section[];
	visibleSections: string[];
	setVisibleSections: (visibleSections: string[]) => void;
	registerHeading: (params: {
		id: string;
		ref: React.RefObject<HTMLElement>;
		offsetRem: number;
	}) => void;
}

type VisibleSectionsProps = {
	sectionStore: any;
};

type SectionStore = {
	setVisibleSections: (visibleSections: string[]) => void;
	sections: Section[];
};

type NavLinkProps = {
	href: string;
	isAnchorLink?: boolean;
	children: React.ReactNode;
	tag?: any;
	active?: boolean;
};

type TopLevelNavItemProps = {
	href: string;
	children: React.ReactNode;
};

type GroupPathProps = {
	pathname?: string;
	group?: any;
	className?: any;
};

type GridPatternProps = {
	width: number;
	height: number;
	x?: number | string;
	y?: number | string;
	squares?: any[];
	className?: string;
};

type HeadingProps = {
	level: any;
	children?: any;
	id?: any;
	tag?: any;
	label?: any;
	anchor?: boolean;
};

interface LanguageMappings {
	[key: string]: string;
}

interface PreferredLanguageState {
	preferredLanguages: any[];
	addPreferredLanguage: (language: any) => void;
}

interface AlgoliaResult {
	// Define the structure of your Algolia result here
	// You can customize this based on your specific use case
	// For example:
	objectID: string;
	title: string;
	content: string;
	// ...
}

interface AlgoliaQuery {
	query: string;
	indexName: string;
	params?: Record<string, any>;
}
// mailer
import type { SendMailOptions, Transporter } from "nodemailer";

type BuildSendMailOptions<T> = {
	transport: Transporter<T>;
	defaultFrom: string;
	processHtml?: (html: string) => string;
};

type ComponentMail = SendMailOptions & {
	component?: JSX.Element;
};

// subscriptions
import Stripe from "stripe";
interface PageMeta {
	title: string;
	description: string;
	cardImage: string;
}

interface Customer {
	id: string /* primary key */;
	stripe_customer_id?: string;
}

interface Product {
	id: string /* primary key */;
	active?: boolean;
	name?: string;
	description?: string;
	image?: string;
	metadata?: Stripe.Metadata;
}

interface ProductWithPrice extends Product {
	prices?: Price[];
}

interface UserDetails {
	id: string /* primary key */;
	first_name: string;
	last_name: string;
	full_name?: string;
	avatar_url?: string;
	billing_address?: Stripe.Address;
	payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

interface Price {
	id: string /* primary key */;
	product_id?: string /* foreign key to products.id */;
	active?: boolean;
	description?: string;
	unit_amount?: number;
	currency?: string;
	type?: Stripe.Price.Type;
	interval?: Stripe.Price.Recurring.Interval;
	interval_count?: number;
	trial_period_days?: number | null;
	metadata?: Stripe.Metadata;
	products?: Product;
}

interface PriceWithProduct extends Price {}

interface Subscription {
	id: string /* primary key */;
	user_id: string;
	status?: Stripe.Subscription.Status;
	metadata?: Stripe.Metadata;
	price_id?: string /* foreign key to prices.id */;
	quantity?: number;
	cancel_at_period_end?: boolean;
	created: string;
	current_period_start: string;
	current_period_end: string;
	ended_at?: string;
	cancel_at?: string;
	canceled_at?: string;
	trial_start?: string;
	trial_end?: string;
	prices?: Price;
}
