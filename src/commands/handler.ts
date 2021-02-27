import * as Discord from 'discord.js';

const validatePermissions = (permissions: string[]) => {
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

const handler = (client: Discord.Client, commandOptions: Record<string, any>) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  // Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands]
  };

  console.log(`Registering command "${commands[0]}"`);

  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  client.commands.set(commands[0], commandOptions)

  for (const command of commands) {
    client.aliases.set(commands[0], command)
  }

};
export default handler