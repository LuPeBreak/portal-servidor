export interface Link {
	id: string;
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

// Favorites Context Types
export interface FavoritesContextType {
	favorites: string[];
	toggleFavorite: (id: string) => void;
	isFavorite: (id: string) => boolean;
	getFavoriteLinks: (allLinks: Link[]) => Link[];
	clearFavorites: () => void;
	cleanOrphanedFavorites: () => void;
}
