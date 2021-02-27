import { Collection } from "discord.js";

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, Record<string, any>>;
        aliases: Collection<string, string>;
    }
}