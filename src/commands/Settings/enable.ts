import { Client } from "discord.js"
import schema from "../../schemas/guild-schema"
import { caps } from "../../functions/utils"

export default {
    usage: '<command  name>',
    example: 'ping',
    name: 'enable',
    disabled: true,
    category: 'Settings',
    permissions: ['ADMINISTRATOR'],
    callback: async (message: any, args: string[], lang: any, client: Client) => {

      try {
      
      const disArr = client.disabled.get(message.guild.id)
      const commandName = args[0].toLowerCase()

      let cd = client.commands.get(commandName) ?? client.commands.get(client.aliases.get(commandName)!) ?? null
      if (cd == null) return message.channel.send('Invalid command')
      if (cd.disabled) return message.channel.send(`You can't enable ${cd.name.toLowerCase()}`)

      if (disArr) {
      if (!disArr.includes(cd.name)) return message.channel.send(`${caps(cd.name)} isn't disabled`)

      
      let changes = await schema.findOneAndUpdate({ _id: message.guild.id }, {
        _id: message.guild.id,
        $pull: {
          disabled_commands: cd.name
        },
      },{ upsert: true })



      // @ts-ignore
      disArr.pop(cd.name)
  return message.channel.send('Enabled `' + cd.name.toLowerCase() + "` command")

      } else return message.channel.send(`${caps(cd.name)} isn't disabled`)
    
} catch (err) { console.log(err) }}}