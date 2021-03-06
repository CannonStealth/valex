import * as Discord from "discord.js";
import { config as dotenv } from "dotenv";
dotenv();

declare module 'discord.js' {
  interface Client {
      commands: Collection<string, Record<string, any>>;
      aliases: Collection<string, string>;
      prefixes: Collection<string, string>;
      categories: Collection<string, any>;
      disabled: Collection<string, any>;
  }
}

const client = new Discord.Client();

const login = async (bot: string = "valex") => {

  let key: string | undefined =
    bot.toLowerCase() === "valex" ? process.env.VALEX : process.env.BETA;

    return await client.login(key);
};



export default client;
export { login as logger };