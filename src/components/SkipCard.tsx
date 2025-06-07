import type { SkipOption } from "../types/SkipOption";

export default function SkipCard({
  skip,
  onSelect,
}: {
  skip: SkipOption;
  onSelect: () => void;
}) {
  const total = skip.priceB4VAT + (skip.priceB4VAT * skip.vat) / 100;

  return (
    <div
      className="snap-start min-w-[240px] sm:min-w-[260px] max-w-[300px] bg-white rounded-xl shadow p-4 mr-4 flex-shrink-0 border border-gray-200 hover:shadow-lg cursor-pointer transition"
      onClick={onSelect}
    >
      {skip.imageUrl && (
        <img
          src={skip.imageUrl}
          alt={`${skip.size}-yard skip`}
          className="w-full h-32 object-cover rounded mb-3"
        />
      )}

      <h3 className="text-lg font-semibold mb-1">{skip.size}-Yard Skip</h3>
      <p className="text-sm">📆 Hire: {skip.hirePeriod} days</p>
      <p className="text-sm font-medium mt-2">
        💰 {total.toLocaleString("en-GB", { style: "currency", currency: "GBP" })}
      </p>
    </div>
  );
}
