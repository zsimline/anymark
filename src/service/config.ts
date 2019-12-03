import * as yaml from 'js-yaml'
import * as fs from 'fs'

function generateConfiguration() {
  try {
    const configurations = yaml.safeLoad(fs.readFileSync('./config.yml'));
    return configurations;
  } catch (e) {
    console.log(e);
  }
}

// 
const configurations = generateConfiguration();


// ##################################
//  System Configuration.
// ##################################
export const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

export const webSocketServerOpts = configurations.options;

