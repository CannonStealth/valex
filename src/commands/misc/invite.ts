import { Message, Client, Collection, MessageEmbed, TextChannel } from "discord.js"
import { invite } from "../../objects/config.json"
import format from "../../functions/math/format"
import ms, { convert } from "../../functions/dates/dates"
import { Channel } from "discord.js"
import { NewsChannel } from "discord.js"
import { callbackify } from "node:util"

const botEmbed: MessageEmbed = new MessageEmbed()
.setColor('GREEN')

export default {
    name: 'invite',
    description: 'Creates an invite',
    usage: '<bot / me> | <voice> | <channel> [#channel]     [duration / forever]',
    example: 'channel #general forever',
    aliases: ['inv'],
    cooldown: '5s',
    colour: 'PURPLE',
    minArgs: 1,
    callback: async(m: Message, args: string[], lang: any, client: Client) => { 

        switch (args[0].toLowerCase()) {
            case 'bot':
                botMe()
            break;

            case 'me':
                botMe()
            break;

            case 'voice':
                voice()
            break;

            case 'channel':
                channel()
            break;

            default:
                botMe()
            break;
        }

        function botMe() {
            botEmbed.setDescription(`Click [here](${invite.replace('{INVITE}', client.user!.id)}) to invite me`)
            return m.channel.send(botEmbed)
        }

        async function voice() {
            if(!m.member!.voice.channel) return m.channel.send('You are not in a voice channel')
            let time: any = 0
            if(!args[1] || args[1].toLowerCase() == 'forever') time = 0
            else {
                try {
                    // @ts-ignore
            time = format(args.slice(1).join(' ')) / 1000
                } catch (e) { return m.channel.send('Incorrect time usage!\nUse `<voice> [forever / 1d 6h 3m 4s]`') }
            if(isNaN(time)) return m.channel.send('Incorrect time usage!\nUse `<voice> [forever / 1d 6h 3m 4s]`')

            if(time > 604800) return m.channel.send(`The custom time cannot be more than ${ms(convert(604800 * 1000), 'long')}`)
            }
            const voiceInvite = await m.member!.voice.channel.createInvite({
                unique: true,
                maxAge: time
            })

            const voiceEmbed = new MessageEmbed()
            .setAuthor(`Join ${m.member?.voice.channel.name}`, m.author.displayAvatarURL())
            .setDescription(`[Join](${voiceInvite})`)
            .setColor(m.member?.displayColor || 'RANDOM')

            return m.channel.send(voiceEmbed)
        }

        async function channel() {
            
            let channel = m.mentions.channels.first() ?? null

            if(channel == null) {
                let time: any = 0
            if(!args[1] || args[1].toLowerCase() == 'forever') time = 0
            else {
                try {
                    // @ts-ignore
            time = format(args.slice(1).join(' ')) / 1000
                } catch (e) { return m.channel.send('Incorrect time usage!\nUse `<channel> [forever / 1d 6h 3m 4s]`') }
            if(isNaN(time)) return m.channel.send('Incorrect time usage!\nUse `<channel> [forever / 1d 6h 3m 4s]`')

            if(time > 604800) return m.channel.send(`The custom time cannot be more than ${ms(convert(604800 * 1000), 'long')}`)
            }

            const ch = m.channel as TextChannel | NewsChannel
            const mcInvite = await ch.createInvite({
                unique: true,
                maxAge: time
            })

            const mcEmbed = new MessageEmbed()
                .setAuthor(`Join ${ch.name} in ${ch.guild.name}`, ch.guild.iconURL as any)
                .setDescription(`[${mcInvite}](${mcInvite})`)
                .setColor(m.member?.displayColor || 'RANDOM')
    
                return m.channel.send(mcEmbed)

            } else {

                let time: any = 0
            if(!args[2] || args[2].toLowerCase() == 'forever') time = 0
            else {
                try {
                    // @ts-ignore
            time = format(args.slice(2).join(' ')) / 1000
                } catch (e) { return m.channel.send('Incorrect time usage!\nUse `<channel> [#channel] [forever / 1d 6h 3m 4s]`') }
            if(isNaN(time)) return m.channel.send('Incorrect time usage!\nUse `<channel> [#channel] [forever / 1d 6h 3m 4s]`')

            if(time > 604800) return m.channel.send(`The custom time cannot be more than ${ms(convert(604800 * 1000), 'long')}`)
            }

            const ch = channel as TextChannel | NewsChannel
            const chInvite = await ch.createInvite({
                unique: true,
                maxAge: time
            })

            const chEmbed = new MessageEmbed()
                .setAuthor(`Join ${ch.name} in ${ch.guild.name}`, ch.guild.iconURL as any)
                .setDescription(`[${chInvite}](${chInvite})`)
                .setColor(m.member?.displayColor || 'RANDOM')
    
                return m.channel.send(chEmbed)
}}}}