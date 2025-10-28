import React, {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { portalConfig } from "@/data/portal-links";
import type { FavoritesContextType, Link } from "@/types";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined,
);

const STORAGE_KEY = "portal-favorites";

// Função para tentar salvar no storage com fallback
const saveToStorage = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch (error) {
		console.warn("localStorage falhou, usando sessionStorage:", error);
		try {
			sessionStorage.setItem(key, value);
		} catch (sessionError) {
			console.warn("Erro ao salvar no sessionStorage:", sessionError);
		}
	}
};

// Função para tentar carregar do storage com fallback
const loadFromStorage = (key: string): string | null => {
	try {
		return localStorage.getItem(key);
	} catch (error) {
		console.warn("localStorage falhou, tentando sessionStorage:", error);
		try {
			return sessionStorage.getItem(key);
		} catch (sessionError) {
			console.warn("Erro ao carregar do sessionStorage:", sessionError);
			return null;
		}
	}
};

// Função para obter todos os IDs válidos dos links
const getAllValidLinkIds = (): string[] => {
	const allIds: string[] = [];
	Object.values(portalConfig).forEach((category) => {
		category.links.forEach((link) => {
			allIds.push(link.id);
		});
	});
	return allIds;
};

interface FavoritesProviderProps {
	children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
	const [favorites, setFavorites] = useState<string[]>(() => {
		// Inicializar diretamente do storage
		try {
			const stored = loadFromStorage(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) {
					// Limpar favoritos órfãos na inicialização
					const validIds = getAllValidLinkIds();
					const cleanedFavorites = parsed.filter((id) => validIds.includes(id));
					return cleanedFavorites;
				}
			}
		} catch (error) {
			console.warn("Erro ao carregar favoritos:", error);
		}
		return [];
	});

	// Salvar favoritos no storage sempre que mudar
	useEffect(() => {
		saveToStorage(STORAGE_KEY, JSON.stringify(favorites));
	}, [favorites]);

	// Toggle favorito (adicionar/remover)
	const toggleFavorite = useCallback((id: string) => {
		// Verificar se o ID é válido antes de adicionar
		const validIds = getAllValidLinkIds();
		if (!validIds.includes(id)) {
			console.warn(`ID de link inválido: ${id}`);
			return;
		}

		setFavorites((prev) => {
			const isFavorite = prev.includes(id);

			if (isFavorite) {
				// Remover dos favoritos
				return prev.filter((favId) => favId !== id);
			} else {
				// Adicionar aos favoritos
				return [...prev, id];
			}
		});
	}, []);

	// Verificar se um link é favorito
	const isFavorite = useCallback(
		(id: string) => {
			return favorites.includes(id);
		},
		[favorites],
	);

	// Obter links favoritos a partir de todos os links
	const getFavoriteLinks = useCallback(
		(allLinks: Link[]) => {
			return allLinks.filter((link) => favorites.includes(link.id));
		},
		[favorites],
	);

	// Limpar todos os favoritos
	const clearFavorites = useCallback(() => {
		setFavorites([]);
	}, []);

	// Limpar favoritos órfãos (função utilitária)
	const cleanOrphanedFavorites = useCallback(() => {
		const validIds = getAllValidLinkIds();
		setFavorites((prev) => prev.filter((id) => validIds.includes(id)));
	}, []);

	// Memoizar o valor do contexto para evitar re-renders desnecessários
	const contextValue = useMemo(
		() => ({
			favorites,
			toggleFavorite,
			isFavorite,
			getFavoriteLinks,
			clearFavorites,
			cleanOrphanedFavorites,
		}),
		[
			favorites,
			toggleFavorite,
			isFavorite,
			getFavoriteLinks,
			clearFavorites,
			cleanOrphanedFavorites,
		],
	);

	return (
		<FavoritesContext.Provider value={contextValue}>
			{children}
		</FavoritesContext.Provider>
	);
}

export { FavoritesContext };
