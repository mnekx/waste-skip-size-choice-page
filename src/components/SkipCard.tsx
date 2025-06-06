import type { SkipOption } from "../types/SkipOption";


export default function SkipCard({ skip }: { skip: SkipOption }) {
  const total = skip.priceB4VAT + (skip.priceB4VAT * skip.vat) / 100;

  return (
    <div className="snap-start min-w-[240px] sm:min-w-[260px] min-w-[240px] sm:min-w-[260px] max-w-[300px] bg-white rounded-xl shadow p-4 mr-4 flex-shrink-0 border border-gray-200">
      {/* 🖼️ Image Section */}
      {skip.imageUrl && (
        <img
          src={skip.imageUrl}
          alt={`${skip.size}-yard skip`}
          className="w-full h-32 object-cover rounded mb-3"
        />
      )}

      {/* 🧾 Info */}
      <h3 className="text-lg font-semibold mb-1">{skip.size}-Yard Skip</h3>
      <p className="text-sm">📍 Postcode: {skip.postCode}</p>
      <p className="text-sm">📆 Hire: {skip.hirePeriod} days</p>
      <p className="text-sm">
        🚚 Road use: {skip.allowedOnRoad ? "✅ Allowed" : "🚫 Not allowed"}
      </p>
      <p className="text-sm">
        🪨 Heavy Waste: {skip.allowsHeavyWaste ? "✅ Yes" : "🚫 No"}
      </p>
      <p className="text-sm font-medium mt-2">
        💰 TZS {total.toLocaleString()} incl. VAT
      </p>
    </div>
  );
}
