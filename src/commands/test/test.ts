import { Message, Client } from "discord.js"


export = {
    note: 'Faça uma pergunta com no mínimo 2 palavras',
    commands: ['test'],
    example: '[pergunta]',
    devOnly: true,
    minArgs: 2,
    devOnlyMessage: 'You can\'t pls stop!',
    callback: (msg: Message, args: string[], text: string, client: Client) => { 

        msg.channel.send('Typescript')
    }}