export interface Link {
	title: string;
	description: string;
	url: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	keywords?: string[];
	isNew?: boolean;
}

export interface Category {
	name: string;
	description: string;
	links: Link[];
}

export interface SearchResult {
	link: Link;
	categoryKey: string;
	categoryName: string;
	score: number;
	matchType:
		| "link-title"
		| "link-description"
		| "link-keywords"
		| "category-title"
		| "category-description";
}
