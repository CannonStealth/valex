import { Message, Client } from "discord.js"


export = {
    name: 'test',
    aliases: ['ca', 'i'],
    devOnly: true,
    minArgs: 2,
    cooldown: '2s 3m',
    devOnlyMessage: 'nonono',
    callback: (msg: Message, args: string[], text: string, client: Client) => { 

        msg.channel.send('Typescript')
    }}