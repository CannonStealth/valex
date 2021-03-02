import { Message, Client, MessageEmbed } from "discord.js"
import * as util from "util"
const x = "```"
import resume from "../../functions/resume" /* Credits for Clefory */

const devOnlyEmbed = new MessageEmbed()
.setTitle('\\❌ | This command is too dangerous to use!')
.setColor('RED')

export default {
    name: 'eval',
    description: 'testing',
    devOnly: true,
    devOnlyMessage: devOnlyEmbed,
    minArgs: 1,
    callback: async(msg: Message, args: string[], lang: any, client: Client) => { 

        let text = args.join(' ')

        const { Message, Client, MessageEmbed } = require("discord.js")

        let secret = new MessageEmbed()
        .setTitle('Processing...')
        .setColor('ORANGE')

        secret = await msg.channel.send(secret)

        const ms = require('ms')
        const message = msg
        const Discord = require('discord.js')
        const bot = client
        const moment = require('moment')


        try {

        let badWords = ['destroy', '.token', '.token', '.valex', '.beta', '.env', 'process.exit', 'for', 'while', 'atob', 'ZGVzdHJveQ==']
        if (badWords.some((word) => text.toLowerCase().includes(word.toLowerCase()))) {

            let NoEmbed = new MessageEmbed()
            .setTitle('Dangerous!')
            .setColor('BLACK')
        secret.edit({ embed: NoEmbed})
        secret.delete({ timeout: 3 * 1000 })
        return
        }

        let toEval: any = eval(text.replace(/```/g, ''))
        if(typeof toEval !== 'string') toEval = resume(util.inspect(toEval, { depth: 0 }), 750);

        //let evaled: any = getResumed(inspect(evaled, { depth: 0 }), 750)


        const embed = new MessageEmbed()
        .addField('To eval:', x  + text + x, false)
        .addField('\\📤 Output:', x + resume(toEval, 750) + x, false)
        .addField('Type', x + typeof toEval + x, false)
        .setColor('#000dff');

        secret.edit({ embed: embed })

    } catch (err) {
        const errEmbed = new MessageEmbed()
        .setTitle('Error')
        .addField('\\📤 Output:', x + resume(err, 750) + x, false)
        .setColor('RED');

        return secret.edit({ embed: errEmbed })

    }
    return

    }}