const { Webhook } = require('discord-webhook-node');

/**
 * @param {import("node-red").NodeAPI} RED
 */
module.exports = function (RED) {
  RED.nodes.registerType('discord', function (config) {
    RED.nodes.createNode(this, config);
    const hook = new Webhook(config.webhook);
    this.on('input', async (msg) => {
      if (Array.isArray(msg.payload) && msg.payload.length) {
        try {
          await hook.send(JSON.stringify(msg.payload));
          msg.payload.success = true;
        } catch (ex) {
          msg.payload.error = ex.toString();
          msg.payload.success = false;
        }
        this.send(msg);
      }
    });
  });
};
