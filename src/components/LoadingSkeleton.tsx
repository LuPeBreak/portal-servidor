interface LoadingSkeletonProps {
	count?: number;
}

export function LoadingSkeleton({ count = 6 }: LoadingSkeletonProps) {
	return (
		<div className="space-y-8 md:space-y-12">
			{Array.from({ length: 3 }).map((_, sectionIndex) => (
				<div key={sectionIndex} className="space-y-4 md:space-y-6">
					{/* Category Header Skeleton */}
					<div className="space-y-2">
						<div
							className="h-6 md:h-8 bg-linear-to-r from-muted/60 via-muted/40 to-muted/60 rounded-lg animate-pulse"
							style={{ width: `${Math.random() * 200 + 150}px` }}
						/>
						<div
							className="h-3 md:h-4 bg-linear-to-r from-muted/40 via-muted/20 to-muted/40 rounded animate-pulse"
							style={{ width: `${Math.random() * 300 + 200}px` }}
						/>
					</div>

					{/* Cards Grid Skeleton */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
						{Array.from({ length: count }).map((_, cardIndex) => (
							<div
								key={cardIndex}
								className="group relative overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm p-4 md:p-6 space-y-3 md:space-y-4"
							>
								{/* Icon Skeleton */}
								<div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-primary/30 via-primary/20 to-primary/10 rounded-lg animate-pulse" />

								{/* Title Skeleton */}
								<div className="space-y-2">
									<div
										className="h-4 md:h-5 bg-linear-to-r from-muted/60 via-muted/40 to-muted/60 rounded animate-pulse"
										style={{ width: `${Math.random() * 120 + 80}px` }}
									/>
									<div
										className="h-3 md:h-4 bg-linear-to-r from-muted/40 via-muted/20 to-muted/40 rounded animate-pulse"
										style={{ width: `${Math.random() * 180 + 100}px` }}
									/>
								</div>

								{/* Shimmer Effect */}
								<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export function SearchBarSkeleton() {
	return (
		<div className="w-full max-w-3xl mx-auto mb-8 md:mb-12">
			<div className="relative">
				<div className="h-12 md:h-16 bg-linear-to-r from-muted/60 via-muted/40 to-muted/60 rounded-2xl animate-pulse" />
				<div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-muted/80 rounded animate-pulse" />
			</div>
		</div>
	);
}

export function HeaderSkeleton() {
	return (
		<header className="bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50 backdrop-blur-sm">
			<div className="container mx-auto px-4 py-4 md:py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3 md:space-x-4">
						<div className="w-10 h-10 md:w-12 md:h-12 bg-primary/30 rounded-lg animate-pulse" />
						<div className="space-y-1 md:space-y-2">
							<div
								className="h-5 md:h-6 bg-muted/60 rounded animate-pulse"
								style={{ width: "200px" }}
							/>
							<div
								className="h-3 md:h-4 bg-muted/40 rounded animate-pulse"
								style={{ width: "150px" }}
							/>
						</div>
					</div>
					<div className="w-8 h-8 md:w-10 md:h-10 bg-muted/60 rounded-lg animate-pulse" />
				</div>
			</div>
		</header>
	);
}
