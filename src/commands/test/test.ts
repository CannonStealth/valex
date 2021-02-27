export = {
    note: 'Faça uma pergunta com no mínimo 2 palavras',
    commands: ['test'],
    example: '[pergunta]',
    minArgs: 2,
    callback: (message: any, args: any, text: any, client: any) => { 

        message.channel.send('Hii')
    }}