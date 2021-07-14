pragma solidity ^0.6.12;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CodeworkNFT is ERC721 {
  uint public codeCount = 0;
  mapping(uint => CodeWork) public codeworkList;

  struct CodeWork {
    uint codeId;
    string workId;
    uint nftId;
    uint date;
    uint price;
    address payable from;
    address payable viewer;
  }

  event CodeWorkSubmit (
    uint codeId,
    string workId,
    string codeURL,
    uint date,
    uint price,
    address payable from,
    address payable viewer
  );

   event Payment (
    address from,
    address to,
    string workId,
    uint codeId,
    uint amount
  );

  constructor() ERC721("Codework NFT", "CWN")  public {}

  function addCodeToWork(string memory _workId, uint _price, string memory _codeURL) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _codeURL);

    codeCount++;
    codeworkList[codeCount] = CodeWork(codeCount, _workId, _tokenId, now, _price, msg.sender, msg.sender);
    
    emit CodeWorkSubmit(codeCount, _workId, _codeURL, now, _price, msg.sender, msg.sender);
  }

  function payCode(uint _codeId) external payable {
    CodeWork memory _codeWork = codeworkList[_codeId];

    _codeWork.from.transfer(msg.value);
    _codeWork.viewer = msg.sender;
    codeworkList[_codeId] = _codeWork;

    emit Payment(msg.sender, _codeWork.from, _codeWork.workId, _codeId, msg.value);
  }
}