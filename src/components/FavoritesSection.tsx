import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useMemo } from "react";
import { portalConfig } from "@/data/portal-links";
import { useFavorites } from "@/hooks/useFavorites";
import type { Link } from "@/types";
import { LinkCard } from "./LinkCard";

export function FavoritesSection() {
	const { favorites, getFavoriteLinks } = useFavorites();

	// Obter todos os links de todas as categorias (memoizado para evitar recriação)
	const allLinks = useMemo(() => {
		const links: Link[] = [];
		Object.values(portalConfig).forEach((category) => {
			links.push(...category.links);
		});
		return links;
	}, []); // Dependência vazia pois portalConfig é estático

	// Obter apenas os links favoritos
	const favoriteLinks = useMemo(() => {
		return getFavoriteLinks(allLinks);
	}, [getFavoriteLinks, allLinks]);

	// Não renderizar se não houver favoritos
	if (favorites.length === 0) {
		return null;
	}

	return (
		<motion.section
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="mb-8 md:mb-12"
		>
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 rounded-lg bg-yellow-500/10">
					<Star className="h-5 w-5 text-yellow-500 fill-current" />
				</div>
				<div>
					<h2 className="text-xl md:text-2xl font-bold text-foreground">
						Meus Favoritos
					</h2>
					<p className="text-sm text-muted-foreground">
						{favorites.length}{" "}
						{favorites.length === 1 ? "favorito" : "favoritos"} salvos
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
				{favoriteLinks.map((link) => (
					<motion.div
						key={link.id}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.2 }}
					>
						<LinkCard link={link} />
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
