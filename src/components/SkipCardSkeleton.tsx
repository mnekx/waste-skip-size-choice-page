export default function SkipCardSkeleton() {
	return (
		<div className="snap-start min-w-[260px] max-w-[300px] bg-white rounded-xl shadow p-4 mr-4 flex-shrink-0 border border-gray-200 animate-pulse">
			<div className="w-full h-32 bg-gray-200 rounded mb-3" />

			<div className="h-4 bg-gray-200 rounded w-[30%] mb-3" />

			<div className="h-5 bg-gray-200 rounded w-[30%] mb-3" />
			<div className="h-5 bg-gray-300 rounded w-[50%]" />
			<div className="h-5 bg-gray-300 rounded w-[90%] justify-center mt-3" />
		</div>
	);
}
