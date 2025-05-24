/**
 * Converts seconds to "hh:mm:ss" format.
 * @param seconds Number of seconds to convert.
 * @returns Time in "hh:mm:ss" format.
 */
export function convertToHoursMinutesSeconds(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const paddedHrs = hrs.toString().padStart(2, '0');
    const paddedMins = mins.toString().padStart(2, '0');
    const paddedSecs = secs.toString().padStart(2, '0');
    return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
}