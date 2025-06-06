export type SkipOption = {
	size: number;
	hirePeriod: number;
	transportCost: number | null;
	perTonneCost: number | null;
	priceB4VAT: number;
	vat: number;
	postCode: string;
	area: string;
	forbidden: boolean;
	createdAt: string;
	updatedAt: string;
	allowedOnRoad: boolean;
	allowsHeavyWaste: boolean;
	imageUrl: string;
};
