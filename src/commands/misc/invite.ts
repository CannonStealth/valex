import { Message, Client, Collection, MessageEmbed } from "discord.js"
import { invite } from "../../objects/config.json"
export default {
    name: 'invite',
    description: 'Creates an invite',
    usage: '<bot / me> / <voice> / <channel> [#channel]   [duration / forever]',
    example: 'channel #general forever',
    aliases: ['inv'],
    cooldown: '5s',
    colour: 'PURPLE',
    minArgs: 1,
    callback: async(msg: Message, args: string[], lang: any, client: Client) => { 


    const embed: MessageEmbed = new MessageEmbed()
    .setColor('GREEN')
    .setDescription(`Click [here](${invite.replace('{INVITE}', client.user!.id)}) to invite me`)

    return msg.channel.send(embed)
    }} // LOAD HI EXXON