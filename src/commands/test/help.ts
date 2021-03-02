import { Message, Client, MessageEmbed } from "discord.js"

export default {
    name: 'help',
    description: 'Show all commands or a specific command information',
    minArgs: 0,
    callback: async(msg: Message, args: string[], lang: any, client: Client) => { 
 
        if(args[0]) getInfo(args[0].toLowerCase())
        else help()

    function getInfo(command: string) { 
        const cmd = client.commands.get(command) ?? client.commands.get(client.aliases.get(command)!) ?? null
        if(cmd == null) return help() 
        console.log(cmd)
    }

    function help() {
        console.log('Do this')
    }

    }}