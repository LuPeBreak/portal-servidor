interface FooterProps {
	isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
	return (
		<footer className="mt-16 py-8 border-t border-border bg-card/50">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center justify-center space-y-4">
					{/* Logo AMO BM */}
					<div className="flex items-center justify-center">
						<img
							src={isDarkMode ? "/amo-bm-dark.png" : "/amo-bm.png"}
							alt="EU AMO BM"
							className="h-8 w-auto object-contain transition-all duration-300 hover:scale-105"
						/>
					</div>

					{/* Informações adicionais */}
					<div className="text-center space-y-2">
						<p className="text-sm text-muted-foreground">
							Portal do Servidor - Prefeitura de Barra Mansa
						</p>
						<p className="text-xs text-muted-foreground/70">
							Desenvolvido com carinho pela equipe de TI da prefeitura de barra
							mansa
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
