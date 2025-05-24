import fs from 'fs/promises'

async function waitForFile(filePath: string, timeoutMs = 5000): Promise<boolean> {
  const intervalMs = 500;
  const maxAttempts = Math.ceil(timeoutMs / intervalMs);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await fs.stat(filePath);
      return true; // file exists
    } catch {
      // file does not exist yet
      await new Promise(r => setTimeout(r, intervalMs));
    }
  }
  return false; // timed out
}

export default waitForFile