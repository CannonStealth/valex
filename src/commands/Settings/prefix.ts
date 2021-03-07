import { Collection } from "discord.js"
import { defaultPrefix, betaPrefix } from "../../objects/config.json"
import schema from "../../schemas/guild-schema"

export default {
    usage: '<new prefix>',
    example: '>>',
    disabled: true,
    name: 'prefix',
    aliases: ['set-prefix', 'setprefix'],
    category: 'Settings',
    permissions: ['ADMINISTRATOR'],
    callback: async (message: any, args: any, lang: any, client: any) => {

        let prefix1 = client.prefixes.get(message.guild.id) ?? null 
        if (prefix1 == null) prefix1 = defaultPrefix
        if (args[0].length > 3) return message.channel.send('Your prefix is longer than 3 characters') // Better?
        if (!isNaN(args[0])) return message.channel.send('The prefix can\'t be a number')
        if (args[0].toLowerCase() == prefix1.toLowerCase()) return message.channel.send("That's your old prefix!")// ajuda oq por mais

        client.prefixes.set(message.guild.id, args[0].toLowerCase())

        await schema.findOneAndUpdate(
            {
              _id: message.guild.id,
            },
            {
              _id: message.guild.id,
              prefix: args[0].toLowerCase(),
            },
            {
              upsert: true,
            }
          )

        return message.channel.send('Prefix changed to `' + args[0].toLowerCase() + "`")
    },

cooldown: '30s'}