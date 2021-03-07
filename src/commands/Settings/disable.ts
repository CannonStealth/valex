import { Client } from "discord.js"
import schema from "../../schemas/guild-schema"
import { caps } from "../../functions/utils"

export default {
    usage: '<command  name>',
    example: 'ping',
    name: 'disable',
    disabled: true,
    category: 'Settings',
    permissions: ['ADMINISTRATOR'],
    callback: async (message: any, args: string[], lang: any, client: Client) => {

      try {
      
      const disArr = client.disabled.get(message.guild.id)
      const commandName = args[0].toLowerCase()

      let cd = client.commands.get(commandName) ?? client.commands.get(client.aliases.get(commandName)!) ?? null
      if (cd == null) return message.channel.send('Invalid command')
      if (cd.disabled) return message.channel.send(`You can't disable ${cd.name.toLowerCase()} command`)

      if (disArr) {
      if (disArr.includes(cd.name)) return message.channel.send(`${caps(cd.name)} is already disabled`)
      }

      if (!disArr || !disArr[0]) client.disabled.set(message.guild.id, [cd.name])
      else disArr.push(cd.name)

        await schema.findOneAndUpdate({ _id: message.guild.id }, {
              _id: message.guild.id,
              $addToSet: {
                disabled_commands: cd.name
              },
            },{ upsert: true })
        return message.channel.send('Disabled `' + cd.name.toLowerCase() + "` command")
} catch (err) { console.log(err) }}}