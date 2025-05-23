function extractFilePathFromStdout(stdout: string): string {
  // Match full path ending in .mp4 or .webm
  const regex = /([A-Za-z]:\\[^<>:"|?*\r\n]+(?:\\[^<>:"|?*\r\n]+)*\.(mp4|webm))/i;
  const match = stdout.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error("No valid .mp4 or .webm file path found in Python output");
}

export default extractFilePathFromStdout