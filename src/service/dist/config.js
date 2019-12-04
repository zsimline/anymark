"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const fs = require("fs");
function generateConfiguration() {
    try {
        const configurations = yaml.safeLoad(fs.readFileSync('./config.yml'));
        return configurations;
    }
    catch (e) {
        console.log(e);
    }
}
const configurations = generateConfiguration();
exports.GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
exports.webSocketServerOpts = configurations.options;
