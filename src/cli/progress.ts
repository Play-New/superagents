/**
 * Progress indicators and spinners
 */

import ora, { type Ora } from 'ora';

export class ProgressIndicator {
  private spinner: Ora | null = null;

  start(message: string): void {
    this.spinner = ora({
      text: message,
      color: 'cyan'
    }).start();
  }

  update(message: string): void {
    if (this.spinner) {
      this.spinner.text = message;
    }
  }

  succeed(message?: string): void {
    if (this.spinner) {
      this.spinner.succeed(message);
      this.spinner = null;
    }
  }

  fail(message?: string): void {
    if (this.spinner) {
      this.spinner.fail(message);
      this.spinner = null;
    }
  }

  info(message: string): void {
    if (this.spinner) {
      this.spinner.info(message);
      this.spinner = null;
    }
  }

  warn(message: string): void {
    if (this.spinner) {
      this.spinner.warn(message);
      this.spinner = null;
    }
  }
}

export async function withProgress<T>(
  message: string,
  task: () => Promise<T>,
  successMessage?: string
): Promise<T> {
  const progress = new ProgressIndicator();
  progress.start(message);

  try {
    const result = await task();
    progress.succeed(successMessage || message);
    return result;
  } catch (error) {
    progress.fail(message);
    throw error;
  }
}
