export default function millisecondsUntil(date: number | Date): number {
	return date.valueOf() - Date.now();
}