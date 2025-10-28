import { Building2, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface HeaderProps {
	title: string;
	subtitle: string;
	isDarkMode: boolean;
	onThemeToggle: () => void;
}

export function Header({
	title,
	subtitle,
	isDarkMode,
	onThemeToggle,
}: HeaderProps) {
	return (
		<header className="relative w-full bg-linear-to-r from-background via-background/98 to-background border-b border-border/50 backdrop-blur-sm">
			{/* Efeito de brilho sutil no fundo */}
			<div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />

			<div className="relative container mx-auto px-4 py-6 md:py-8">
				<div className="flex items-center justify-between gap-4">
					{/* Área da Logo + Título */}
					<div className="flex items-center space-x-4 md:space-x-6 flex-1 min-w-0">
						{/* Placeholder para Logo Futura */}
						<div className="shrink-0">
							<div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-primary/20 via-primary/10 to-primary/5 rounded-xl border border-primary/20 flex items-center justify-center group hover:from-primary/30 hover:via-primary/15 hover:to-primary/8 transition-all duration-300">
								<Building2 className="w-6 h-6 md:w-8 md:h-8 text-primary/70 group-hover:text-primary transition-colors" />
							</div>
						</div>

						{/* Área de Título e Subtítulo */}
						<div className="flex flex-col space-y-1 md:space-y-2 flex-1 min-w-0">
							<h1 className="text-xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-foreground via-foreground/95 to-foreground/90 bg-clip-text text-transparent leading-tight">
								{title}
							</h1>
							<p className="text-sm md:text-lg text-muted-foreground/80 font-medium leading-relaxed">
								{subtitle}
							</p>
						</div>
					</div>

					{/* Controle de Tema */}
					<div className="shrink-0">
						<div className="flex items-center space-x-2 md:space-x-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-full px-3 py-2 md:px-4 md:py-2.5 hover:bg-background/70 hover:border-border/70 transition-all duration-300 group">
							<Sun className="h-4 w-4 md:h-5 md:w-5 text-amber-500 group-hover:text-amber-400 transition-colors" />
							<Switch
								checked={isDarkMode}
								onCheckedChange={onThemeToggle}
								aria-label="Alternar tema escuro/claro"
								className="data-[state=checked]:bg-slate-600 data-[state=unchecked]:bg-amber-200"
							/>
							<Moon className="h-4 w-4 md:h-5 md:w-5 text-slate-400 group-hover:text-slate-300 transition-colors" />
						</div>
					</div>
				</div>
			</div>

			{/* Linha decorativa inferior */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
		</header>
	);
}
