const { Webhook } = require('discord-webhook-node');

module.exports = function (RED) {
  function DiscordNode(config) {
    RED.nodes.createNode(this, config);
    const hook = new Webhook(config.webhook);
    this.on('input', (msg) => {
      if (Array.isArray(msg.payload) && msg.payload.length) {
        hook.send(JSON.stringify(msg.payload));
      }
    });
  }
  RED.nodes.registerType('discord', DiscordNode);
};
