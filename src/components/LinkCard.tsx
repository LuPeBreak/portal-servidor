import { motion } from "framer-motion";
import { Globe, Star } from "lucide-react";
import { memo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Link } from "@/types";
import { useFavorites } from "../hooks/useFavorites";

interface LinkCardProps {
	link: Link;
}

export const LinkCard = memo(function LinkCard({ link }: LinkCardProps) {
	const { toggleFavorite, isFavorite } = useFavorites();
	const {
		id,
		title,
		description,
		url,
		icon: IconComponent = Globe,
		isNew = false,
	} = link;

	const isLinkFavorite = isFavorite(id);

	const handleClick = useCallback(() => {
		window.open(url, "_blank", "noopener,noreferrer");
	}, [url]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleClick();
			}
		},
		[handleClick],
	);

	const handleFavoriteClick = useCallback(
		(event: React.MouseEvent) => {
			event.stopPropagation();
			toggleFavorite(id);
		},
		[id, toggleFavorite],
	);

	const handleFavoriteKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				event.stopPropagation();
				toggleFavorite(id);
			}
		},
		[id, toggleFavorite],
	);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<motion.div
						whileHover={{
							y: -4,
							transition: { duration: 0.2, ease: "easeOut" },
						}}
						whileTap={{ scale: 0.98 }}
						className="h-full"
					>
						<Card
							className={`
								group cursor-pointer h-full relative overflow-hidden
								bg-card border-2 border-border/60 shadow-md shadow-primary/5
								transition-all duration-300 ease-out
								hover:border-primary/50 hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1
								focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background
								before:absolute before:inset-0 before:bg-linear-to-br 
								before:from-primary/8 before:via-transparent before:to-primary/4
								before:opacity-0 before:transition-opacity before:duration-300
								hover:before:opacity-100
							`}
							onClick={handleClick}
							onKeyDown={handleKeyDown}
							tabIndex={0}
							role="button"
							aria-label={`Abrir ${title} - ${description} em nova aba`}
							aria-describedby={`card-description-${id}`}
						>
							{/* Efeito de brilho no hover */}
							<div
								className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
								aria-hidden="true"
							/>

							<CardHeader className="pb-3 relative z-10">
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-3">
										{/* Ícone com animação */}
										<motion.div
											className="p-2.5 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300"
											whileHover={{
												rotate: [0, -10, 10, 0],
												transition: { duration: 0.5 },
											}}
											aria-hidden="true"
										>
											<IconComponent className="h-5 w-5 text-primary group-hover:text-primary/90 transition-colors" />
										</motion.div>
										<div className="flex-1 min-w-0">
											<CardTitle className="text-sm font-semibold text-card-foreground transition-colors duration-300 line-clamp-2 leading-tight">
												{title}
											</CardTitle>
										</div>
									</div>
									<div className="flex items-center gap-2 shrink-0">
										{/* Botão de Favorito */}
										<motion.button
											onClick={handleFavoriteClick}
											onKeyDown={handleFavoriteKeyDown}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className={`
												p-1.5 rounded-lg transition-all duration-200
												hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
												${
													isLinkFavorite
														? "text-yellow-500 hover:text-yellow-600"
														: "text-muted-foreground hover:text-yellow-500"
												}
											`}
											aria-label={
												isLinkFavorite
													? `Remover ${title} dos favoritos`
													: `Adicionar ${title} aos favoritos`
											}
											aria-pressed={isLinkFavorite}
											tabIndex={0}
											title={
												isLinkFavorite
													? `Remover ${title} dos favoritos`
													: `Adicionar ${title} aos favoritos`
											}
										>
											<Star
												className={`h-4 w-4 transition-all duration-200 ${
													isLinkFavorite ? "fill-current" : ""
												}`}
											/>
										</motion.button>
										{isNew && (
											<motion.div
												initial={{ scale: 0.8, opacity: 0 }}
												animate={{ scale: 1, opacity: 1 }}
												transition={{ delay: 0.2 }}
											>
												<Badge
													variant="secondary"
													className="text-xs px-2 py-1 bg-accent text-accent-foreground border-border"
													aria-label="Item novo"
												>
													Novo
												</Badge>
											</motion.div>
										)}
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-0 pb-4 relative z-10">
								<p
									id={`card-description-${id}`}
									className="text-xs text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-muted-foreground/80 transition-colors"
								>
									{description}
								</p>
							</CardContent>

							{/* Indicador de hover sutil */}
							<div
								className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary/50 via-secondary/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								aria-hidden="true"
							/>
						</Card>
					</motion.div>
				</TooltipTrigger>
				<TooltipContent side="top" className="max-w-xs">
					<p>Clique para acessar {title}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
});
