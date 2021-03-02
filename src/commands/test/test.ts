import { Message, Client } from "discord.js"


export default {
    name: 'test',
    devOnly: true,
    minArgs: 2,
    cooldown: '2s 3m',
    devOnlyMessage: 'nonono',
    callback: (msg: Message, args: string[], lang: string, client: Client) => { 

        msg.channel.send('SHATAP CURSORS')
    }}