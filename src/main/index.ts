import client, { logger as login } from '../client/client'
import loadCommands from '../commands/load'
import loadHandler from "../client/handler"

client.on('ready', () => { 

console.log('Active as ' + client.user!.tag)

loadHandler(client)
loadCommands(client)

})

login('beta')