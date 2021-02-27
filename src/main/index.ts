import client, { logger as login } from '../functions/client'
import loadHandler from '../commands/load'

client.on('ready', () => { 
    console.log('Active as ' + client.user!.tag) 

loadHandler(client)

})

login('beta')