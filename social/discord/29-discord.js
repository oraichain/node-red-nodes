module.exports = function (RED) {
  function DiscordNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      alert(JSON.stringify(config));
      node.send(msg);
    });
  }
  RED.nodes.registerType('discord', DiscordNode);
};
