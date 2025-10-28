import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	placeholder?: string;
}

interface SearchBarRef {
	focusInput: () => void;
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
	(
		{
			searchTerm,
			onSearchChange,
			placeholder = "Buscar sistemas e serviços...",
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false);
		const [isTyping, setIsTyping] = useState(false);
		const inputRef = useRef<HTMLInputElement>(null);

		// Expor método para focar no input
		useImperativeHandle(ref, () => ({
			focusInput: () => {
				inputRef.current?.focus();
			},
		}));

		// Detectar quando o usuário está digitando
		useEffect(() => {
			if (searchTerm.length > 0) {
				setIsTyping(true);
				const timer = setTimeout(() => setIsTyping(false), 1000);
				return () => clearTimeout(timer);
			} else {
				setIsTyping(false);
			}
		}, [searchTerm]);

		const clearSearch = () => {
			onSearchChange("");
			inputRef.current?.focus();
		};

		return (
			<div className="w-full max-w-3xl mx-auto mb-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="relative group"
				>
					{/* Background com gradiente e glow effect */}
					<div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

					{/* Container principal */}
					<div
						className={`
					relative bg-linear-to-r from-background via-background/95 to-background
					backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-out
					${
						isFocused
							? "border-primary/50 shadow-2xl shadow-primary/25 bg-background/98"
							: "border-border/50 hover:border-border shadow-lg hover:shadow-xl"
					}
				`}
					>
						{/* Ícone de busca animado */}
						<div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
							<motion.div
								animate={{
									rotate: isTyping ? 360 : 0,
									scale: isFocused ? 1.1 : 1,
								}}
								transition={{
									rotate: { duration: 0.8, ease: "easeInOut" },
									scale: { duration: 0.2, ease: "easeOut" },
								}}
							>
								<Search
									className={`h-5 w-5 transition-colors duration-300 ${
										isFocused ? "text-primary" : "text-muted-foreground"
									}`}
								/>
							</motion.div>
						</div>

						{/* Input field */}
						<Input
							ref={inputRef}
							type="text"
							placeholder={placeholder}
							value={searchTerm}
							onChange={(e) => onSearchChange(e.target.value)}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							className={`
							pl-14 pr-12 py-6 text-lg bg-transparent border-0 rounded-2xl
							placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0
							transition-all duration-300 ease-out
							${isFocused ? "text-foreground" : "text-foreground/90"}
						`}
							aria-label="Campo de busca para sistemas e serviços"
						/>

						{/* Botão de limpar */}
						<AnimatePresence>
							{searchTerm && (
								<motion.button
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
									onClick={clearSearch}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-muted/50 transition-colors duration-200 group/clear"
									aria-label="Limpar busca"
								>
									<X className="h-4 w-4 text-muted-foreground group-hover/clear:text-foreground transition-colors" />
								</motion.button>
							)}
						</AnimatePresence>
					</div>

					{/* Indicador de atividade */}
					<AnimatePresence>
						{isTyping && (
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
							>
								<div className="flex items-center space-x-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: "linear",
										}}
										className="w-3 h-3 border border-primary/30 border-t-primary rounded-full"
									/>
									<span>Buscando...</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Efeito de brilho no hover */}
					<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
				</motion.div>

				{/* Dicas de atalhos */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.4 }}
					className="mt-4 text-center"
				>
					<p className="text-xs text-muted-foreground/60">
						💡 Dica: Use{" "}
						<kbd className="px-1.5 py-0.5 bg-muted/50 rounded text-xs">
							Ctrl+K
						</kbd>{" "}
						para focar na busca
					</p>
				</motion.div>
			</div>
		);
	},
);
