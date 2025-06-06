export class Logger {
  static log(message: string) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static debug(message: string) {
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
  }

  static error(message: string, error?: Error) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (error) {
      console.error(error);
    }
  }

  static warn(message: string) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }
}
