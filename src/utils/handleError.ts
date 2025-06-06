export function handleError(
	err: unknown,
	callback?: (msg: string) => void,
	context?: string
): void {
	let errStr = "";
	if (err instanceof Error) {
		errStr = `[${context ?? "Error"}] -- ${err.message}`;
		console.error(`[${context ?? "Error"}]`, err.message);
		console.error(err.stack);
	} else {
		errStr = `[${context ?? "Unknown Error"}] -- ${err}`;
		console.error(`[${context ?? "Unknown Error"}]`, err);
	}
	if (callback) {
		callback(errStr);
	}
}
