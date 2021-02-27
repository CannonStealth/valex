import * as path from 'path';
import * as fs from 'fs';
import commandBase from './handler';

const load = (client: any) => {
  const baseFile = 'handler.ts';
  
   

  const commands: any = [];

  const readCommands = (dir: any) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile && file !== 'load.ts') {
        const option = require(path.join(__dirname, dir, file));
        commands.push(option);
        if (client) {
          commandBase(client, option);
        }
      }
    }
  }

  readCommands('.');

  return commands;
}

export default load;