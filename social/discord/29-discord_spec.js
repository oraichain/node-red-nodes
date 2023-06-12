const helper = require('node-red-node-test-helper');
const discordNode = require('./29-discord');

describe('discord Node', () => {
  afterEach(() => {
    helper.unload();
  });

  it('should be loaded', async () => {
    const flow = [{ id: 'n1', type: 'discord', name: 'test name', webhook: 'https://fake.url' }];
    await helper.load(discordNode, flow);
    const n1 = helper.getNode('n1');
    n1.should.have.property('name', 'test name');
  });

  it('should make payload', async () => {
    const flow = [
      { id: 'n1', type: 'helper', wires: [['n2']] },
      { id: 'n2', type: 'discord', name: 'test name', webhook: 'https://fake.url' }
    ];
    await helper.load(discordNode, flow);
    const n2 = helper.getNode('n2');
    const n1 = helper.getNode('n1');
    n2.on('input', function (msg) {
      msg.should.have.property('webhook', 'https://fake.url');
    });
    n1.send({ payload: [] });
  });
});
