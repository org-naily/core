import chalk from "chalk";

export interface LoggerService {
  log<Message>(message: Message, category?: string): void;
  warn<Message>(message: Message, category?: string): void;
  error<Message>(message: Message, category?: string): void;
  debug<Message>(message: Message, category?: string): void;
  info<Message>(message: Message, category?: string): void;
}

export class NailyLogger implements LoggerService {
  private readonly logger = console.log;
  constructor(private readonly category: string = "Naily") {}

  log<Message>(message: Message, category?: string): void {
    this.logger(chalk.green(`${new Date().toLocaleString()} - [${category || this.category}] ${message}`));
  }

  warn<Message>(message: Message, category?: string): void {
    this.logger(chalk.yellow(`${new Date().toLocaleString()} - [${category || this.category}] ${message}`));
  }

  error<Message>(message: Message, category?: string): void {
    this.logger(chalk.red(`${new Date().toLocaleString()} - [${category || this.category}] ${message}`));
  }

  debug<Message>(message: Message, category?: string): void {
    this.logger(chalk.blue(`${new Date().toLocaleString()} - [${category || this.category}] ${message}`));
  }

  info<Message>(message: Message, category?: string): void {
    this.logger(chalk.cyan(`${new Date().toLocaleString()} - [${category || this.category}] ${message}`));
  }
}
