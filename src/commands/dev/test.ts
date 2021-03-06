import { Message, Client, MessageEmbed } from "discord.js"
let x = "`"
import { short } from "../../functions/dates/types"
import { convert as c } from "../../functions/dates/dates"

const embed = new MessageEmbed()
.setColor('BLUE')

export default {
    name: 'test',
    cooldown: '5s',
    category: 'Owner Only',
    hidden: true, 
    cooldownMessage: 'Wait {TIME} more to execute `{COMMAND}` again',
    callback: async(message: Message, args: string[], lang: any, client: Client) => {

      embed.setTitle('Pong \\🏓')

      const m = await message.channel.send('Ping?');

      let texta = `${client.user!.tag} **Ping**: ${x}${m.createdTimestamp -
        message.createdTimestamp}${x}
        **Api Ping**: ${x}${Math.round(
          client.ws.ping
        )}${x}
        **Uptime**: ${x}${short(c(client.uptime!)).toString().replace(',', ' ').replace(',', ' ').replace(',', ' ').replace(',', ' ').replace(',', ' ').replace(',', ' ').replace(',', ' ').replace(',', ' ').trim()}${x}` // perfect

      embed.setDescription(texta)
      m.edit(` `, { embed: embed })


}}