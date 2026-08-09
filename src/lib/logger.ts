type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

class Logger {
  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, data } = entry;
    const dataStr = data ? ` ${JSON.stringify(data)}` : "";
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${dataStr}`;
  }

  debug(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: "debug",
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.debug(this.formatLog(entry));
  }

  info(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: "info",
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.info(this.formatLog(entry));
  }

  warn(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: "warn",
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.warn(this.formatLog(entry));
  }

  error(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.error(this.formatLog(entry));
  }
}

export const logger = new Logger();
