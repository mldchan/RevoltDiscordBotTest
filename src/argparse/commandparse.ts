import { Message } from "revolt.js";
import { parseArguments } from "./argparse";

export class CommandRegistry {
    commands: Array<Command> = [];

    registerCommand(cmd: Command) {
        this.commands.push(cmd);
    }

    async processCommands(message: Message) {
        if (message.author?.bot) return;
        let params = parseArguments(message.content ?? "");
        if (typeof params === "string") {
            return;
        }

        for (let command of this.commands) {
            if (command.name === `${params[0]}` && command.subcommand === "") {
                console.log(`calling "${command.name}" (no subcommand)`);
                if (!await command.function(message, params.slice(1, params.length - 1))) {
                    await message.reply(command.help);
                }
            }

            if (command.name === `${params[0]}` && command.subcommand === params[1]) {
                console.log(`calling "${command.name}" (subcommand "${command.subcommand}")`);
                if (!await command.function(message, params.slice(2, params.length - 2))) {
                    await message.reply(command.help);
                }
            }
        }
    }

}

export class Command {
    name: string;
    subcommand: string;
    help: string;
    function: (message: Message, params: Array<string>) => Promise<boolean>;

    constructor (name: string, subCommand: string, help: string, func: (message: Message, params: Array<string>) => Promise<boolean>) {
        this.name = `/${name}`;
        this.subcommand = subCommand;
        this.help = help;
        this.function = func;
    }
}
