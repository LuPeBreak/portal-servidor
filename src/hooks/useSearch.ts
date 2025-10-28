import { useEffect, useMemo, useState } from "react";
import type { Category, SearchResult } from "@/types";
import { calculateRelevanceScore, searchInKeywords } from "@/utils/search";

export function useSearch(portalConfig: Record<string, Category>) {
	const [searchTerm, setSearchTerm] = useState("");

	// Inicializar com query param da URL
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const queryParam = urlParams.get("q");
		if (queryParam) {
			setSearchTerm(decodeURIComponent(queryParam));
		}
	}, []);

	// Atualizar URL quando searchTerm mudar
	useEffect(() => {
		const url = new URL(window.location.href);
		if (searchTerm.trim()) {
			url.searchParams.set("q", encodeURIComponent(searchTerm.trim()));
		} else {
			url.searchParams.delete("q");
		}

		// Atualizar URL sem recarregar a página
		window.history.replaceState({}, "", url.toString());
	}, [searchTerm]);

	const filteredCategories = useMemo(() => {
		if (!searchTerm.trim()) {
			return portalConfig;
		}

		const term = searchTerm.toLowerCase().trim();
		const searchResults: SearchResult[] = [];

		// Buscar em todos os links com sistema de prioridades
		Object.entries(portalConfig).forEach(([categoryKey, category]) => {
			category.links.forEach((link) => {
				const results: {
					score: number;
					matchType: SearchResult["matchType"];
				}[] = [];

				// Priority 1: Link title
				const titleScore = calculateRelevanceScore(link.title, term);
				if (titleScore > 0) {
					results.push({ score: titleScore + 600, matchType: "link-title" });
				}

				// Priority 2: Link description
				const descScore = calculateRelevanceScore(link.description, term);
				if (descScore > 0) {
					results.push({
						score: descScore + 500,
						matchType: "link-description",
					});
				}

				// Priority 3: Link keywords
				const keywordScore = searchInKeywords(link.keywords, term);
				if (keywordScore > 0) {
					results.push({
						score: keywordScore + 400,
						matchType: "link-keywords",
					});
				}

				// Priority 4: Category title
				const catTitleScore = calculateRelevanceScore(category.name, term);
				if (catTitleScore > 0) {
					results.push({
						score: catTitleScore + 300,
						matchType: "category-title",
					});
				}

				// Priority 5: Category description
				const catDescScore = calculateRelevanceScore(
					category.description,
					term,
				);
				if (catDescScore > 0) {
					results.push({
						score: catDescScore + 200,
						matchType: "category-description",
					});
				}

				// Se encontrou alguma correspondência, adicionar aos resultados
				if (results.length > 0) {
					const bestMatch = results.reduce((best, current) =>
						current.score > best.score ? current : best,
					);

					searchResults.push({
						link,
						categoryKey,
						categoryName: category.name,
						score: bestMatch.score,
						matchType: bestMatch.matchType,
					});
				}
			});
		});

		// Ordenar por score (maior primeiro)
		searchResults.sort((a, b) => b.score - a.score);

		// Agrupar resultados por categoria
		const filtered: Record<string, Category> = {};
		const processedCategories = new Set<string>();

		for (const result of searchResults) {
			if (!processedCategories.has(result.categoryKey)) {
				// Se a categoria ainda não foi processada, verificar se deve incluir todos os links
				if (result.matchType === "category-title") {
					// Se a busca corresponde ao título da categoria, incluir todos os links
					filtered[result.categoryKey] = {
						name: result.categoryName,
						description: portalConfig[result.categoryKey].description,
						links: portalConfig[result.categoryKey].links,
					};
				} else {
					// Caso contrário, incluir apenas os links que correspondem à busca
					const categoryLinks = searchResults
						.filter(
							(r) =>
								r.categoryKey === result.categoryKey &&
								["link-title", "link-description", "link-keywords"].includes(
									r.matchType,
								),
						)
						.map((r) => r.link);

					if (categoryLinks.length > 0) {
						filtered[result.categoryKey] = {
							name: result.categoryName,
							description: portalConfig[result.categoryKey].description,
							links: categoryLinks,
						};
					}
				}
				processedCategories.add(result.categoryKey);
			}
		}

		return filtered;
	}, [portalConfig, searchTerm]);

	const hasResults = Object.keys(filteredCategories).length > 0;
	const totalResults = Object.values(filteredCategories).reduce(
		(total, category) => total + category.links.length,
		0,
	);

	return {
		searchTerm,
		setSearchTerm,
		filteredCategories,
		hasResults,
		totalResults,
		isSearching: searchTerm.trim().length > 0,
	};
}
