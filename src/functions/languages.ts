import languageSchema from '../schemas/guild-schema'
import lang from '../objects/lang.json'
import { Client } from 'discord.js'
import mongoose from 'mongoose'

const guildLanguages: object | number | symbol | string | any = {}

const loadLanguages = async (client: Client) => {
  
      for (const guild of client.guilds.cache) {
        const guildId = guild[0]

        const result: any = await languageSchema.findOne({
          _id: guildId,
        })

        guildLanguages[guildId] = result ? result.language : 'english'
      }
}

const setLanguage = (guild: any, language: any) => {
  guildLanguages[guild.id] = language.toLowerCase()
}


 export default (guild: any, textId: any) => { 
// @ts-ignore 
  if (!lang.translations[textId]) {
    throw new Error(`Unknown text ID "${textId}"`)
  }

  const selectedLanguage = guildLanguages[guild.id].toLowerCase()
// @ts-ignore 
  return lang.translations[textId][selectedLanguage]
}

export { loadLanguages }
export { setLanguage }