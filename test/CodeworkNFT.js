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

  describe('code work', async() => {
    let result;
    let codeCount;

    const workId = "1";
    const price = "1";
    const codeURL = "hi2h99shji2jhr3oi2";

    before(async() => {
      result = await contract.addCodeToWork(workId, price, codeURL, { from: account1 });
      codeCount = await contract.codeCount();
    });

    it('add code work', async() => {
      const event = result.logs[1].args;
      assert.equal(event.codeId.toNumber(), codeCount, 'Code Id is correct');
      assert.equal(event.workId, workId, 'Work Id is correct');
      assert.equal(event.codeURL, codeURL, 'Code URL is correct');
      assert.equal(event.price, price, 'Price is correct');
      assert.equal(event.from, account1, 'Owner address is correct');
      assert.equal(event.viewer, account1, 'Viewer address is correct');
    });

    it('mints NFT for coder', async () => {
      result = await contract.totalSupply();
      assert.equal(result.toString(), '1', 'Total supply is correct');

      result = await contract.balanceOf(account1);
      assert.equal(result.toString(), '1', 'balanceOf is correct');

      result = await contract.ownerOf('1');
      assert.equal(result.toString(), account1.toString(), 'Coder got a NFT');

      result = await contract.tokenURI('1');
      assert.equal(result.toString(), codeURL, 'NFT URI is correct');
    })
  });

  describe('pay coder', async() => {
    let result;
    let codeData;
    let workId = 1;
    let codeId = 1;
    
    before(async() => {
      codeData = await contract.codeworkList(1);
    });
    
    it('received correct funds', async() => {
      let oldBalanace = await web3.eth.getBalance(account1);
      oldBalanace = new web3.utils.BN(oldBalanace);

      result = await contract.payCode(codeId, { from: account2, value: web3.utils.toWei(codeData.price.toString(), 'Ether') });
      
      let newBalanace = await web3.eth.getBalance(account1);
      newBalanace = new web3.utils.BN(newBalanace);

      let amount = web3.utils.toWei(codeData.price.toString(), 'Ether');
      amount = new web3.utils.BN(amount);

      const expectedBalance = oldBalanace.add(amount);

      assert.equal(newBalanace.toString(), expectedBalance.toString());
      
      const event = result.logs[0].args;
      assert.equal(event.from, account2, 'Payer address is correct');
      assert.equal(event.to, account1, 'Coder address is correct');
      assert.equal(event.workId, workId, 'Work Id is correct');
      assert.equal(event.codeId, codeId, 'Code Id is correct');
      assert.equal(event.amount.toString(), web3.utils.toWei(codeData.price.toString(), 'Ether'), 'Amount is correct');
    });

    it('set from completed to the payer', async() => {
      let code = await contract.codeworkList(workId);
      assert.equal(code.viewer, account2);
    });
  });
})