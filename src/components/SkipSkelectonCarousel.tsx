import SkipCardSkeleton from "../components/SkipCardSkeleton";

export default function SkipSkeletonCarousel() {
  return (
    <div className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-4 pb-2 px-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkipCardSkeleton key={i} />
      ))}
    </div>
  );
}
