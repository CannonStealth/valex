import client from '../functions/client'
import { logger as login } from '../functions/client'

// WebHook Manager

client.on('ready', () => {
    console.log('Active as ' + client.user!.tag)
})
login('beta')

