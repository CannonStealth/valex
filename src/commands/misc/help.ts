import { Message, Client, Collection, MessageEmbed } from "discord.js"
import { invite, server } from "../../objects/config.json"
import { defaultPrefix, betaPrefix } from "../../objects/config.json"
const x = "`"

const blockedEmbed = new MessageEmbed()
.setTitle('\\🔒 Command Locked')
.setColor('YELLOW')

export default {
    name: 'help',
    description: 'Shows all commands or a specific command information',
    usage: '[command | category]',
    hidden2: true,
    cooldown: '3s',
    callback: async(msg: Message, args: string[], lang: any, client: Client) => { 

    let prefix = client.prefixes.get(msg.guild!.id) ?? null
    if(prefix == null) prefix = client.user!.id == '809393759204409364' ? defaultPrefix : betaPrefix

    const allEmbed: MessageEmbed = new MessageEmbed()
    .setColor('GREEN')
    .setAuthor(`${msg.guild} Avaible Commands List`, msg.guild!.iconURL()!)


    if(args[0]) getInfo(args[0].toLowerCase())
    else help()

    function getInfo(command: string) { 
        const cmd = client.commands.get(command) ?? client.commands.get(client.aliases.get(command)!) ?? null
        if(cmd == null || cmd.hidden) return category() 

        if(cmd.locked) { 
          blockedEmbed.setDescription(`I'm sorry but ${args[0].toLowerCase()} is blocked at the moment`)
          return msg.channel.send(blockedEmbed)
        }
        const infoEmbed = new MessageEmbed()
        .setTitle(`${cmd.name} Command Info`)
        .setColor(cmd.colour || 'GREEN')

        if(cmd.description) infoEmbed.addField('Description', x + cmd.description + x, false)

        infoEmbed.addField('Usage', x + cmd.description + x, false)
        .addFields( 
            {name: 'Usage', value: x + prefix + cmd.name + ' ' + (cmd.usage || '') + x, inline: false},
            {name: 'Example', value: x + prefix + cmd.name + ' ' + (cmd.example || '') + x, inline: false},
            )
            .setFooter(`Requested by ${msg.member!.displayName || msg.author.username}`, msg.author.displayAvatarURL())

            if(cmd.aliases || typeof cmd.aliases != 'undefined') infoEmbed.addField('Aliases', x + '❯ ' + cmd.aliases.join(',\n❯ ') + x, false)
            if(cmd.cooldown && cmd.cooldown != '0s') infoEmbed.addField('Cooldown', x + (cmd.cooldown || '0s') + x, false)
      
        return msg.channel.send(infoEmbed)      
    }

function help() {
    let total = 0

client.categories.forEach(category => {

  console.log(category)

  let desc: string[] = []
  // @ts-ignore
  category.slice(1).forEach(cmd => {
    let command = client.commands.get(cmd.toLowerCase()) || null
    if(command == null) return
    if(command.locked) return
    if(command.hidden) return
    if(command.hidden2) return
    desc.push(cmd)
    total++
  })

  if(!desc[0]) return
  console.log(desc)

  // @ts-ignore
 allEmbed.addField('**' + category[0].replace(/_/g, ' ').replace(/\b[a-zA-Z]/g, m => m.toUpperCase()) + '**', '`' + desc.join('`, `') + '`')
  
})

allEmbed
.setDescription(
  `${client.user!.username} total avaible commands: **${total}**
  [Invite Me](${invite.replace('${INVITE}', client.user!.id)})
  [Support Server](${server})`
  )
.setThumbnail(client.user!.displayAvatarURL())
.setFooter(`Requested by ${msg.member!.displayName || msg.author.username}`, msg.author.displayAvatarURL())
return msg.channel.send(allEmbed)
}

function category() {

  const categoryEmbed = new MessageEmbed()
  .setColor('BLUE')
  .setFooter(`Requested by ${msg.member!.displayName || msg.author.username}`, msg.author.displayAvatarURL())

  let desc: string = ' '.trim()
  let total: number = 0

  let category = client.categories.get(args.join(' ').toLowerCase()) || null
  if (category == null) return help()

  // @ts-ignore
  category.slice(1).forEach(cmd => {
    let command = client.commands.get(cmd.toLowerCase()) || null
    if(command == null) return
    if(command.locked) return
    if(command.hidden) return 
    if(command.hidden2) return 

    let description;

    if (command.description) description = ' - ' + '`' + command.description + '`'
    else description = ' '
    desc += '**' + prefix + command.name + '**' + description + '\n'
    total++
  })

  if(total == 0) return help()

  categoryEmbed
  .setDescription(desc)
   // @ts-ignore
  .setAuthor(`${msg.guild} ${category[0].replace(/_/g, ' ').replace(/\b[a-zA-Z]/g, m => m.toUpperCase())} Avaible Commands (${total})`, msg.guild!.iconURL()!)
  // @ts-ignore
  
  return msg.channel.send(categoryEmbed)

}



    }}