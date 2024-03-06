export class Logger {
  logError(errorMessage: string) {
    console.error(`[ERROR] ${errorMessage}`);
  }

  logMessage(message: string) {
    console.log(`[INFO] ${message}`);
  }
}