import client, { logger as login } from '../functions/client'

client.on('ready', () => { console.log('Active as ' + client.user!.tag) })

login('beta')