const { assert } = require('chai');

const CodeworkNFT = artifacts.require("CodeworkNFT");

contract('Codework NFT', ([deployer, account1, account2]) => {
  let contract;

  before(async() => {
    contract = await CodeworkNFT.new();
  });

  describe('deployment', async() => {
    it('deploys successfully', async() => {
      const address = await contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe('work', async() => {
    let result;
    let worksCount;

    const metadataURL = "hi2h99shji2jhr3oi2";

    before(async() => {
        result = await contract.createWork(metadataURL, { from: account1 });
        worksCount = await contract.worksCount();
    });

    it('create work', async() => {
        const event = result.logs[0].args;
        assert.equal(event.workId.toNumber(), worksCount, 'Id is correct');
        assert.equal(event.metadataURL, metadataURL, 'Metadata URL is correct');
        assert.equal(event.from, account1, 'Owner address is correct');
    });
});

})