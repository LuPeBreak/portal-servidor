import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface HeaderProps {
	isDarkMode: boolean;
	onThemeToggle: () => void;
}

export function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
	return (
		<header
			className="relative bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm h-24"
			role="banner"
			aria-label="Cabeçalho do Portal do Servidor"
		>
			{/* Efeito de brilho sutil */}
			<div
				className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5"
				aria-hidden="true"
			/>

			{/* Container principal */}
			<div className="relative z-10 h-full">
				<div className="container mx-auto px-4 h-full flex items-center justify-between">
					{/* Logo e título */}
					<div className="flex items-center gap-4">
						<div className="shrink-0">
							<img
								src={isDarkMode ? "/logo-portal-dark.png" : "/logo-portal.png"}
								alt="Portal do Servidor - Prefeitura Municipal de Barra Mansa"
								className="w-32 md:w-40 lg:w-56 object-contain transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								tabIndex={0}
								role="img"
							/>
						</div>
					</div>

					<div className="flex items-center gap-4">
						{/* AMO BM */}
						<div className="shrink-0">
							<img
								src={isDarkMode ? "/amo-bm-dark.png" : "/amo-bm.png"}
								alt="AMO BM - Logotipo da cidade"
								className="w-20 md:w-28 lg:w-32 object-contain transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								tabIndex={0}
								role="img"
							/>
						</div>

						{/* Theme Switcher */}
						<div
							className="flex items-center space-x-2 md:space-x-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl px-3 py-2 md:px-4 md:py-3 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
							role="group"
							aria-label="Controles de tema"
						>
							<Sun
								className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${!isDarkMode ? "text-primary scale-110" : "text-muted-foreground scale-100"}`}
								aria-hidden="true"
							/>
							<Switch
								checked={isDarkMode}
								onCheckedChange={onThemeToggle}
								aria-label={`Alternar para tema ${isDarkMode ? "claro" : "escuro"}. Tema atual: ${isDarkMode ? "escuro" : "claro"}`}
								className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/20 border-2 data-[state=checked]:border-primary data-[state=unchecked]:border-primary/30 focus:ring-2 focus:ring-primary focus:ring-offset-2"
								title={`Alternar para tema ${isDarkMode ? "claro" : "escuro"}`}
							/>
							<Moon
								className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${isDarkMode ? "text-primary scale-110" : "text-muted-foreground scale-100"}`}
								aria-hidden="true"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Linha decorativa inferior */}
			<div
				className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
				aria-hidden="true"
			/>
		</header>
	);
}
