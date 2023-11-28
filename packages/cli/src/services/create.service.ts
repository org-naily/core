import { Bean, Injectable } from "@org-naily/core";
import inquirer from "inquirer";

interface PromptValue {
  name: string;
  type: "standard" | "library";
  dependencies: string[];
}

@Injectable
export class CreateService {
  @Bean()
  public async newProject() {
    const value = await inquirer.prompt<PromptValue>([
      {
        type: "input",
        name: "name",
        message: "Please enter the project name:",
        validate(input) {
          if (!input) return "Project name cannot be empty.";
          return true;
        },
      },
      {
        type: "list",
        name: "type",
        message: "Please choice the project type:",
        choices: [
          {
            name: "Standard Application",
            value: "standard",
          },
          {
            name: "Library",
            value: "library",
          },
        ],
      },
      {
        type: "checkbox",
        name: "dependencies",
        message: "Please choice the dependencies:",
        choices: [
          {
            name: "Naily Backend",
            extra: "Naily Backend App Support",
            value: "@org-naily/backend",
            checked: false,
          },
          {
            name: "Naily Backend Express",
            extra: "Naily Express Adapter For Naily Backend",
            value: "@org-naily/backend-express",
            checked: false,
          },
          {
            name: "Naily Backend Koa",
            extra: "Naily Koa Adapter For Naily Backend",
            value: "@org-naily/backend-koa",
            checked: false,
          },
          {
            name: "Naily Backend Fastify",
            extra: "Naily Fastify Adapter For Naily Backend",
            value: "@org-naily/backend-fastify",
            checked: false,
          },
          {
            name: "Naily SocketIO",
            extra: "Naily SocketIO Support",
            value: "@org-naily/socketio",
            checked: false,
          },
          {
            name: "Naily TypeORM",
            extra: "Naily TypeORM Support",
            value: "@org-naily/typeorm",
            checked: false,
          },
          {
            name: "Naily Prisma",
            extra: "Naily Prisma Support",
            value: "@org-naily/prisma",
            checked: false,
          },
          {
            name: "Naily Sequelize",
            extra: "Naily Sequelize Support",
            value: "@org-naily/sequelize",
            checked: false,
          },
          {
            name: "Naily Security",
            extra: "Naily Passport Support",
            value: "@org-naily/passport",
            checked: false,
          },
          {
            name: "Naily Cache",
            extra: "Naily Cache Manager Support",
            value: "@org-naily/cache-manager",
            checked: false,
          },
        ],
      },
    ]);
  }
}
