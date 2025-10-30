import { useEffect, useRef } from "react";
import { CategorySection } from "./components/CategorySection";
import { FavoritesSection } from "./components/FavoritesSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { portalConfig } from "./data/portal-links";
import { useSearch } from "./hooks/useSearch";
import { useTheme } from "./hooks/useTheme";
import { formatSearchMessage } from "./utils/text";

function App() {
	const { isDarkMode, toggleTheme } = useTheme();
	const searchBarRef = useRef<{ focusInput: () => void }>(null);

	const {
		searchTerm,
		setSearchTerm,
		filteredCategories,
		hasResults,
		totalResults,
		isSearching,
	} = useSearch(portalConfig);

	// Atalho de teclado Ctrl+K para focar na busca
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "k") {
				event.preventDefault();
				searchBarRef.current?.focusInput();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />

			<main className="container mx-auto px-4 py-6 md:py-8 flex-1">
				<SearchBar
					ref={searchBarRef}
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
				/>

				{/* Seção de Favoritos - aparece apenas quando não está buscando e há favoritos */}
				{!isSearching && <FavoritesSection />}

				{isSearching && (
					<div className="mb-6 text-center">
						<p className="text-muted-foreground text-sm md:text-base">
							{formatSearchMessage(totalResults, searchTerm, hasResults)}
						</p>
					</div>
				)}

				{isSearching ? (
					hasResults ? (
						<div className="space-y-8 md:space-y-12">
							{Object.entries(filteredCategories).map(([key, category]) => (
								<CategorySection
									key={key}
									name={category.name}
									description={category.description}
									links={category.links}
								/>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<p className="text-muted-foreground text-base md:text-lg">
								Tente buscar por outros termos ou navegue pelas categorias
								abaixo.
							</p>
						</div>
					)
				) : (
					<div className="space-y-8 md:space-y-12">
						{Object.entries(portalConfig).map(([key, category]) => (
							<CategorySection
								key={key}
								name={category.name}
								description={category.description}
								links={category.links}
							/>
						))}
					</div>
				)}
			</main>

			<Footer isDarkMode={isDarkMode} />
		</div>
	);
}

export default App;
