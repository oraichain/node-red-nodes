module.exports = function (RED) {
  function DiscordNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      console.log(JSON.stringify(config));
      node.send(msg);
    });
  }
  RED.nodes.registerType('discord', DiscordNode);
};
