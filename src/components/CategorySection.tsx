import type { Link } from "@/types";
import { LinkCard } from "./LinkCard";

interface CategorySectionProps {
	name: string;
	description: string;
	links: Link[];
}

export function CategorySection({
	name,
	description,
	links,
}: CategorySectionProps) {
	if (links.length === 0) {
		return null;
	}

	return (
		<section
			className="space-y-6"
			aria-labelledby={`category-${name.replace(/\s+/g, "-").toLowerCase()}`}
		>
			{/* Header da seção */}
			<div className="space-y-2">
				<h2
					id={`category-${name.replace(/\s+/g, "-").toLowerCase()}`}
					className="text-2xl font-bold text-foreground tracking-tight"
				>
					{name}
				</h2>
				<p className="text-muted-foreground leading-relaxed max-w-3xl">
					{description}
				</p>
			</div>

			{/* Grid de cards responsivo */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
				{links.map((link, index) => (
					<div key={`${link.title}-${index}`} className="h-full">
						<LinkCard link={link} />
					</div>
				))}
			</div>
		</section>
	);
}
