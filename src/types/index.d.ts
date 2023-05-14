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
	sections: React.ReactNode | any;
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
