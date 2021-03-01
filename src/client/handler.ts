import { Collection, Message, Role, Client, MessageEmbed } from "discord.js"
import { defaultPrefix, betaPrefix } from "../objects/config.json"
import { evaluate } from "mathjs";
import ms, { convert as convertor } from "../functions/dates/dates"
const cooldownMap = new Map()

const devOnlyEmbed = new MessageEmbed()
.setTitle('\\❌ This command can only be used by bot owner!')
.setColor('RED')

const cooldownEmbed = new MessageEmbed()
.setTitle('\\❌ Calm down, you\'re in a cooldown!')
.setColor('RED')

export = (client: Client) => {

let prefix: string | undefined = client.user!.id == '809393759204409364' ? defaultPrefix : betaPrefix

client.commands = new Collection();
client.aliases = new Collection();

client.on("message", async (message: Message) => {

  if(message.author.bot) return
  if(message.channel.type == 'dm') return

  const { member, content, guild } = message;

  if (guild == null || member == null) return;

  if (!message.content.startsWith(prefix!)) return;

  const args = message.content.slice(prefix!.length).trim().split(/ +/g)

  const commandName = args.shift()!;

  const command = `${prefix}${commandName.toLowerCase()}`;

  const cmd = client.commands.get(commandName) ?? client.commands.get(client.aliases.get(commandName)!) ?? null


  if (cmd == null) return;

  const { 
   devOnly = false,
   devOnlyMessage = devOnlyEmbed, 
   cooldown = '2s',
   cooldownMessage = cooldownEmbed,
   channelPermissions = [], 
   channelPermissionError = 'You don\'t have that persmission!', 
   permissions = [], permissionError = 'Perm error', 
   requiredRoles = [], minArgs, 
   maxArgs = null, 
   expectedArgs = '', 
   callback
  } = cmd

  if (
    content.toLowerCase().startsWith(`${command} `) ||
    content.toLowerCase() === command
  ) {

    if(devOnly) {
      if(!client.guilds.cache.get('814832821125775420')?.members.cache.get(message.author.id)?.roles.cache.has('815304261902532668')) return message.channel.send(devOnlyMessage).catch(() => { return })
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

    for (const channelPermission of channelPermissions) {
      if (message.channel.permissionsFor(message.author.id)!.has(channelPermission)) {
        message.channel.send(channelPermissionError);
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

    if(cooldown) {
      let cd = '( ' + cooldown.replace('m', ' * 60 + ').replace('h', ' * 60 * 60 + ').replace('d', ' * 24 * 60 * 60 + ').replace('s',' + 0 + ') + '0 ) * 1000'

      cd = evaluate(cd)

      let isCooldown = cooldownMap.get(message.author.id + cmd.name) || false

      if(Date.now() > isCooldown) {

      let after = cd + Date.now()
      cooldownMap.set(message.author.id + cmd.name, after)
      console.log(cooldownMap)

      } else {

        let timeLeftArray = convertor(isCooldown, 3, Date.now(), '-')
        let remaining = ms(timeLeftArray, 'short')

        cooldownEmbed.setDescription(`Wait ${remaining} more to use ${cmd.name} again`)
        
        return message.channel.send(cooldownMessage)
      }
    }

    callback(message, args, args.join(" ")!, client);

    return;
  }
});
}