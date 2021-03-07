import { Collection, Message, Role, Client, MessageEmbed } from "discord.js"
import { defaultPrefix, betaPrefix } from "../objects/config.json"
import ms, { convert as convertor } from "../functions/dates/dates"
import format from "../functions/math/format"
import language from '../functions/languages'

const cooldownMap = new Map()

const blockedEmbed = new MessageEmbed()
.setTitle('\\🔒 Command Locked')
.setColor('YELLOW')

const devOnlyEmbed = new MessageEmbed()
.setTitle('\\❌ This command can only be used by bot owner!')
.setColor('RED')

const cooldownEmbed = new MessageEmbed()
.setTitle('\\❌ Calm down, you\'re in a cooldown!')
.setColor('RED')

export = (client: Client) => {

client.commands = new Collection();
client.aliases = new Collection();
client.prefixes = new Collection();
client.categories = new Collection();
client.disabled = new Collection();

let prefix: any = defaultPrefix


client.on("message", async (message: Message) => {

  if(message.author.bot) return
  if(message.channel.type == 'dm') return

  const { member, content, guild } = message;

  if (guild == null || member == null) return;

  prefix = client.prefixes.get(message.guild!.id) ?? prefix ?? null 

  if (!message.content.startsWith(prefix!)) {
    if(message.content.trim() == `<@!${client.user!.id}>`) {

      let guildPrefix = client.prefixes.get(message.guild!.id) ?? null
      if (guildPrefix == null) guildPrefix = defaultPrefix

      return message.channel.send(`My prefix for ${message.guild!.name} is \`${guildPrefix}\``)
    } else return
  }

  const args = message.content.slice(prefix!.length).trim().split(/ +/g)

  const commandName = args.shift()!;

  const disArr = client.disabled.get(message.guild!.id) ?? null
  if (disArr != null && disArr[0] && disArr.includes(commandName.toLowerCase())) return

  const command = `${prefix}${commandName.toLowerCase()}`;

  const cmd = client.commands.get(commandName.toLowerCase()) ?? client.commands.get(client.aliases.get(commandName.toLowerCase())!) ?? null

  prefix = client.prefixes.get(message.guild!.id) ?? null

  if(prefix == null) prefix = defaultPrefix

  if (cmd == null) return;

  const { 
   devOnly = false,
   description = language(message.guild, 'NO_DESCRIPTION'),
   devOnlyMessage = devOnlyEmbed, 
   hidden = false,
   hidden2 = false,
   locked = false,
   cooldown = '2s',
   cooldownMessage = cooldownEmbed,
   channelPermissions = [], 
   channelPermissionError = 'You don\'t have that persmission!', 
   permissions = [], 
   permissionError = 'You don\'t have that persmission!', 
   requiredRoles = [], 
   minArgs,
   undisabled = false, 
   maxArgs = null, 
   expectedArgs = '', 
   category = 'Misc',
   usage = ' ',
   example = ' ',
   callback
  } = cmd

  if (
    content.toLowerCase().startsWith(`${command} `) ||
    content.toLowerCase() === command
  ) {

    if(devOnly) {
      if(!client.guilds.cache.get('814832821125775420')?.members.cache.get(message.author.id)?.roles.cache.has('815304261902532668')) return message.channel.send(devOnlyMessage).catch(() => { return })
    } 

    if(locked) {
      blockedEmbed.setDescription(`I'm sorry but ${cmd.name} is blocked at the moment`)
      return message.channel.send(blockedEmbed)
    }
    for (const permission of permissions) {
      if (!member!.hasPermission(permission)) {
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

      let cd = format(cooldown.toString())

      let isCooldown = cooldownMap.get(message.author.id + cmd.name) || false

      if(Date.now() > isCooldown) {

      let after = cd + Date.now()
      cooldownMap.set(message.author.id + cmd.name, after)

      } else {

        let timeLeftArray = convertor(isCooldown, 3, Date.now(), '-')
        let remaining = ms(timeLeftArray, 'short')

        cooldownEmbed.setDescription(`Wait ${remaining} more to use ${cmd.name} again`)

        try {
        
        return message.channel.send(cooldownMessage.replace(' {TIME}', remaining).replace('{COMMAND}', cmd.name))

        } catch (err) { return message.channel.send(cooldownMessage) }
      }
    } 

    callback(message, args, language, client);

    return;
  }
});
}