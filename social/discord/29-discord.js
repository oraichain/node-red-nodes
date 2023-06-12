const { Webhook } = require('discord-webhook-node');

module.exports = function (RED) {
  RED.nodes.registerType('discord', function (config) {
    RED.nodes.createNode(this, config);
    const hook = new Webhook(config.webhook);
    this.on('input', (msg) => {
      if (Array.isArray(msg.payload) && msg.payload.length) {
        hook.send(JSON.stringify(msg.payload));
      }
    });
  });
};
