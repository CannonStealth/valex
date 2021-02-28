import { Collection, Message, Role, Client, MessageEmbed } from "discord.js"
import { defaultPrefix, betaPrefix } from "../objects/config.json"

const devOnlyEmbed = new MessageEmbed()
.setTitle('\\❌ This command can only be used by bot owner!')
.setColor('RED')
export = (client: Client) => {

let prefix: string | undefined = client.user!.id == '809393759204409364' ? defaultPrefix : betaPrefix

client.commands = new Collection();
client.aliases = new Collection();


client.on("message", async (message: Message) => {
  const { member, content, guild } = message;

  if (guild == null || member == null) return;

  if (!message.content.startsWith(prefix!)) return;

  const args = message.content.slice(prefix!.length).trim().split(/ +/g)

  const commandName = args.shift()!;

  const command = `${prefix}${commandName.toLowerCase()}`;

  const cmd = client.commands.get(commandName) ?? client.commands.get(client.aliases.get(commandName)!) ?? null

  if (cmd == null) return;

  const { devOnly = false, devOnlyMessage = false, permissions = [], permissionError = 'Perm error', requiredRoles = [], minArgs, maxArgs = null, expectedArgs = '', callback} = cmd

  if (
    content.toLowerCase().startsWith(`${command} `) ||
    content.toLowerCase() === command
  ) {

    if(devOnly) {
      if(!client.guilds.cache.get('814832821125775420')?.members.cache.get(message.author.id)?.roles.cache.has('815304261902532668')) return message.channel.send(devOnlyMessage || devOnlyEmbed)
    }
    for (const permission of permissions) {
      if (member!.hasPermission(permission)) {
        message.channel.send(permissionError);
        return;
      }
    }

    for (const requiredRole of requiredRoles) {
      const role = guild?.roles.cache.find(
        (role: Role) => role.name === requiredRole
      );

      if (!role || !member?.roles.cache.has(role.id)) {
        message.channel.send(
          `You must have the "${requiredRole}" role to use this command.`
        );
        return;
      }
    }

    const args: string[] = content.split(/[ ]+/);

    args.shift();

    // Ensure we have the correct number of arguments
    if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
      message.channel.send(
        `Incorrect syntax! Use ${prefix}${commandName} ${expectedArgs}`
      );
      return;
    }

    // Handle the custom command code
    callback(message, args, args.join(" ")!, client);

    return;
  }
});
}