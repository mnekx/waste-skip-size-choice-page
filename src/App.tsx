import { useEffect, useState } from "react";
import SkipCard from "./components/SkipCard";
import type { SkipOption } from "./types/SkipOption";

function App() {
  const [skips, setSkips] = useState<SkipOption[]>([]);

  useEffect(() => {
    const mock: SkipOption[] = [
      {
        size: 6,
        hirePeriod: 14,
        priceB4VAT: 305,
        vat: 20,
        postCode: "NR32",
        allowedOnRoad: true,
        allowsHeavyWaste: true,
        transportCost: null,
        perTonneCost: null,
        area: "",
        forbidden: false,
        createdAt: "",
        updatedAt: "",
        imageUrl: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg"
      },
      {
        size: 4,
        hirePeriod: 7,
        priceB4VAT: 200,
        vat: 20,
        postCode: "NR31",
        allowedOnRoad: false,
        allowsHeavyWaste: false,
        transportCost: null,
        perTonneCost: null,
        area: "",
        forbidden: false,
        createdAt: "",
        updatedAt: "",
        imageUrl: "	https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg"
      },
    ];
    setSkips(mock);
  }, []);

  return (
    <main className="p-4 max-w-screen-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Choose Your Skip Size</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Allowed on Road</h2>
        <div className="flex overflow-x-auto scrollbar-hide scroll-smooth space-x-4 pb-2">
          {skips
            .filter((s) => s.allowedOnRoad)
            .map((skip, i) => (
              <SkipCard key={i} skip={skip} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default App;
