import * as Discord from 'discord.js'
const client = new Discord.Client()
import { config as dotenv } from 'dotenv'
dotenv()

const login = async(bot: string = 'valex') => {
    let key: string | undefined;

    switch(bot) {
        case 'valex':
            key = process.env.VALEX
            break; 

            case 'beta':
                key = process.env.BETA
                break;

                default: 
                key = process.env.VALEX
                break;               
    }

    return client.login(key)

}

export default client
export { login as logger }