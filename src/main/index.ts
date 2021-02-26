import client from '../functions/client'
import { logger as login } from '../functions/client'

// testing

client.on('ready', () => {
    console.log('Active as ' + client.user!.tag)
})
login('beta')

