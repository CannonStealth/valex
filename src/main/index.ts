import client, { logger as login } from '../client/client'
import loadCommands from '../commands/load'
import loadHandler from "../client/handler"
import { MessageEmbed } from "discord.js"
import moment from "moment"
import { emoji } from "../objects/emojis.json"
import { ColorResolvable } from 'discord.js'
import mongo from '../functions/db/mongo'

client.on('ready', async () => { 

console.log('Active as ' + client.user!.tag)

await mongo().then(async (mongoose) => {
    console.log(`Connected to MongoDB`)
    })

    console.log('LOAD BITCH LOAAAAAAAAAAAAAAAAD')

loadHandler(client)
loadCommands(client)

let time: any = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')

let reStartChannel: any = client.user!.id == '809393759204409364' ? '814868877699186719' : '815643329391099935'
reStartChannel = client.channels.cache.get(reStartChannel)

if(!reStartChannel) return

let msg: any = await reStartChannel.messages.fetch().catch(() => { return })
if(!msg || typeof msg == 'undefined') return
msg = msg.last()

let colour: ColorResolvable | string
client.user!.id == '809393759204409364' ? colour = 'GREEN' : colour = '#ac00ff'

const reStartEmbed = new MessageEmbed()
.setDescription(`**${emoji}${client.user!.tag} was restarted at ${time}**`)
.setColor(colour)
msg.edit(' '.trim(),{ embed: reStartEmbed })

})

login('beta')