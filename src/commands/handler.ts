import * as Discord from 'discord.js';
import { defaultPrefix as prefix } from '../objects/config.json'

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

const handler = (client: Discord.Client, commandOptions: any) => {
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

  client.on('message', (message: Discord.Message) => {
    const { member, content, guild } = message;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {

        for (const permission of permissions) {
          if (member!.hasPermission(permission)) {
            message.channel.send(permissionError);
            return;
          };
        };

        for (const requiredRole of requiredRoles) {
          const role = guild?.roles.cache.find(
            (role: Discord.Role) => role.name === requiredRole
          );

          if (!role || !member?.roles.cache.has(role.id)) {
            message.channel.send(
              `You must have the "${requiredRole}" role to use this command.`
            );
            return;
          };
        };

        const args: string[] = content.split(/[ ]+/);

        args.shift();

        // Ensure we have the correct number of arguments
        if (
          args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
        ) {
          message.channel.send(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          );
          return;
        };

        // Handle the custom command code
        callback(message, args, args.join(' ')!, client);

        return;
      };
    };
  });
};
export default handler