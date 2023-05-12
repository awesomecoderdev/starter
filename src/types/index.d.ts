type LayoutComponentsProps = {
	children: React.ReactNode | any;
	sections?: Section[];
};
type ProseProps = {
	children: React.ReactNode;
	className?: string;
	as?: any;
};

type MobileNavigationState = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
};

type SectionProviderState = {
	sections: any;
};

type SectionProviderProps = {
	children: React.ReactNode;
	sections: React.ReactNode | any;
};

type Section = {
	id: string;
	headingRef?: React.RefObject<HTMLElement>;
	offsetRem?: number;
};

type SectionProviderCreateStore = {
	sections: Section[];
	visibleSections: string[];
	setVisibleSections: (visibleSections: string[]) => void;
	registerHeading: (params: {
		id: string;
		ref: React.RefObject<HTMLElement>;
		offsetRem: number;
	}) => void;
};

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