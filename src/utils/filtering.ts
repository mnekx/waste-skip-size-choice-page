export default function formatFilterKey(key: string): string {
	switch (key) {
		case "allowedOnRoad":
			return "Allowed on Road";
		case "allowsHeavyWaste":
			return "Allows Heavy Waste";
		case "size8":
			return "8-Yard";
		case "size12":
			return "12-Yard";
		case "hirePeriod14":
			return "14 Days";
		default:
			return key;
	}
}
