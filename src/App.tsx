import { useEffect, useRef } from "react";
import { CategorySection } from "./components/CategorySection";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { portalConfig } from "./data/portal-links";
import { siteConfig } from "./data/site-config";
import { useSearch } from "./hooks/useSearch";
import { useTheme } from "./hooks/useTheme";

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
			<Header
				title={siteConfig.title}
				subtitle={siteConfig.subtitle}
				isDarkMode={isDarkMode}
				onThemeToggle={toggleTheme}
			/>

			<main className="container mx-auto px-4 py-6 md:py-8 flex-1">
				<SearchBar
					ref={searchBarRef}
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
				/>

				{isSearching && (
					<div className="mb-6 text-center">
						<p className="text-muted-foreground text-sm md:text-base">
							{hasResults
								? `${totalResults} resultado${totalResults !== 1 ? "s" : ""} encontrado${totalResults !== 1 ? "s" : ""} para "${searchTerm}"`
								: `Nenhum resultado encontrado para "${searchTerm}"`}
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

			<footer className="bg-muted/30 border-t border-border mt-auto">
				<div className="container mx-auto px-4 py-4 md:py-6">
					<div className="text-center text-xs md:text-sm text-muted-foreground">
						<p>
							© 2024 Prefeitura Municipal de Barra Mansa - Todos os direitos
							reservados
						</p>
						<p className="mt-1">
							Portal desenvolvido para facilitar o acesso aos sistemas
							municipais
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
