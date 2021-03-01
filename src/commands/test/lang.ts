import languageSchema from '../../schemas/guild-schema'
import { languages } from '../../objects/lang.json'
import language, { setLanguage } from '../../functions/languages'

module.exports = {
  name: 'language',
  aliases: 'lang',
  callback: async (message: any, args: any) => {

    try {
    const { guild } = message

    let targetLanguage = args[0].toLowerCase()
    let languageSetted = targetLanguage
    targetLanguage = targetLanguage.replace('ê', 'e')
    if (!languages.includes(targetLanguage)) {
      message.reply('That language is not supported.')
      return
    }

    setLanguage(guild, targetLanguage)

        await languageSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            language: targetLanguage,
          },
          {
            upsert: true,
          }
        )

        message.reply(language(message.guild, 'LANGUAGE_SET').replace('{LANG}', languageSetted)).then((message: any) => {
          const seconds = 3
          message.delete({
            timeout: 1000 * seconds,
          })
        })
    } catch (err) { console.log(err) }
  },
}