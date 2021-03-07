import * as Discord from 'discord.js'
import { PermissionResolvable } from 'discord.js'
import { caps } from "../../functions/utils"
const yes: string = '✔️'
const no: string = '❌'
const x: string = "```"
const s: string = '📛'
const c: string = '♨️'

const permissions: string[] | PermissionResolvable[] | any[] = [
  'CREATE_INSTANT_INVITE',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'ADMINISTRATOR',
  'MANAGE_CHANNELS',
  'MANAGE_GUILD', 
  'ADD_REACTIONS',
  'VIEW_AUDIT_LOG',
  'PRIORITY_SPEAKER',
  'STREAM',
  'VIEW_CHANNEL',
  'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',
  'MANAGE_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'MENTION_EVERYONE',
  'USE_EXTERNAL_EMOJIS',
  'VIEW_GUILD_INSIGHTS',
  'CONNECT',
  'SPEAK',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',
  'USE_VAD',
  'CHANGE_NICKNAME',
  'MANAGE_NICKNAMES',
  'MANAGE_ROLES',
  'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS',
]

export default {
    name: 'permissions',
    description: 'Shows a member permission',
    example: '@myAmazingNickname #general',
    usage: '[@member] [#channel]',
    aliases: ['permsfor', 'perms'],
    cooldown: '5s',
    colour: 'ORANGE',
    callback: async(message: Discord.Message, args: string[], lang: any, client: Discord.Client) => { 

        const channel: Discord.TextChannel = message.mentions.channels.first() || message.channel as Discord.TextChannel

    let user = message.mentions.members!.first() || message.guild!.members.cache.get(args[0]) || message.member
    let userId = user!.user.id

    let description = `Server - ${s}\n${caps(message.mentions.channels.first()?.name || 'Current Channel')} - ${c}\n\n${s} | ${c}\n`

    let embed = new Discord.MessageEmbed()
    .setTitle(`${user!.user.username} Permissions`)
    .setColor(user!.displayColor || 'RANDOM')

permissions.forEach(perm => { 
 description += `${user!.permissions.has(perm) ? yes : no} | ${channel.permissionsFor(userId)!.has(perm) ? yes : no} - ${caps(perm)}\n` 
})
embed.setDescription(x + description + x)

return message.channel.send(embed)
}}