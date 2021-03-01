import { Message, Client, MessageEmbed } from "discord.js"

export = {
    name: 'ping',
    cooldown: '5s',
    cooldownMessage: 'Heheheh {TIME}, {COMMAND}',
    callback: async(message: Message, args: string[], text: any, client: Client) => { 


      const m = await message.channel.send('ping?');
    
      m.edit(`🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp -
          message.createdTimestamp}ms.**\nLatência da API: **${Math.round(
          client.ws.ping
        )}ms**`)

}}