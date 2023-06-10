module.exports = function (RED) {
  function DiscordNode(config) {
    RED.nodes.createNode(this, config);
    const { Webhook } = this.context().global.get('discord-webhook-node');
    const hook = new Webhook(config.webhook);
    this.on('input', (msg) => {
      if (Array.isArray(msg.payload) && msg.payload.length) {
        hook.send(JSON.stringify(msg.payload));
      }
    });
  }
  RED.nodes.registerType('discord', DiscordNode);
};
