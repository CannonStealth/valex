import * as Discord from 'discord.js';
import schema from "../schemas/guild-schema"

const validatePermissions = async (permissions: string[]) => {
  const validPermissions: string[] = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    };
  };
};

const handler = async (client: Discord.Client, commandOptions: Record<string, any>) => {
  let {
    aliases = [],
    name,
    permissions = [],
    category = 'Misc',
  } = commandOptions;

  // let's leave this empty

  
  if (typeof aliases === 'string') {
    aliases = []
  };

  console.log(`Registering command "${name}"`);

  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  client.commands.set(name, commandOptions)


  for (const command of aliases) {
    client.aliases.set(command, name) 
  }

  if(category) {
    let categoryGetter = client.categories.get(category.toLowerCase())
    if(!categoryGetter) categoryGetter = [category]
    categoryGetter.push(name)

    client.categories.set(category.toLowerCase(), categoryGetter)
  }

  const results = await schema.find()
  if (!results) return

  for (const a of results) {
    
    // @ts-ignore
  if (!a || !a._id || !a.prefix) return
  // @ts-ignore
    client!.prefixes.set(a._id, a.prefix)
} 
};
export default handler // eman how to push in maps ?? pls explain