import fetch from 'node-fetch'
import { Client, Message, MessageEmbed } from 'discord.js'
const err: string = 'Couldn\'t find that documentation!'

export default {
    name: 'docs',
    description:'Get a discord.js docs',
    example: 'TextChannel#send()',
    usage: '<documentation>',
    hidden2: true,
    minArgs: 1,
    callback: async(message: Message, args: string[], lang: any, client: Client) => { 

       fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`)
       .then((res: any) => res.json())
       .then((embed: MessageEmbed | any) => {
           if(embed && !embed.error) return message.channel.send({embed})
           else return message.channel.send(err)
       })
       .catch(() => { return message.channel.send(err) });    
}}
