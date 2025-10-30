import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface HeaderProps {
	isDarkMode: boolean;
	onThemeToggle: () => void;
}

export function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
	return (
		<header className="relative bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm h-24">
			{/* Efeito de brilho sutil */}
			<div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />

			{/* Container principal */}
			<div className="relative z-10 h-full">
				<div className="container mx-auto px-4 h-full flex items-center justify-between">
					{/* Logo e título */}
					<div className="flex items-center gap-4">
						<div className="shrink-0">
							<img
								src={isDarkMode ? "/logo-portal-dark.png" : "/logo-portal.png"}
								alt="Portal do Servidor - Prefeitura Municipal de Barra Mansa"
								className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 object-contain transition-all duration-300 hover:scale-105"
							/>
						</div>
					</div>

					<div className="flex items-center gap-4">
						{/* AMO BM */}
						<div className="shrink-0">
							<img
								src={isDarkMode ? "/amo-bm-dark.png" : "/amo-bm.png"}
								alt="AMO BM"
								className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain transition-all duration-300 hover:scale-105"
							/>
						</div>

						{/* Theme Switcher */}
						<div className="flex items-center space-x-2 md:space-x-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl px-3 py-2 md:px-4 md:py-3 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
							<Sun
								className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${!isDarkMode ? "text-primary scale-110" : "text-muted-foreground scale-100"}`}
							/>
							<Switch
								checked={isDarkMode}
								onCheckedChange={onThemeToggle}
								aria-label={`Alternar para tema ${isDarkMode ? "claro" : "escuro"}`}
								className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/20 border-2 data-[state=checked]:border-primary data-[state=unchecked]:border-primary/30"
							/>
							<Moon
								className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${isDarkMode ? "text-primary scale-110" : "text-muted-foreground scale-100"}`}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Linha decorativa inferior */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
		</header>
	);
}
