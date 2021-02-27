import * as Discord from "discord.js";

declare module 'discord.js' {
    interface Client {
        commands: Discord.Collection<string, Record<string, any>>;
        aliases: Discord.Collection<string, string>;
    }
}