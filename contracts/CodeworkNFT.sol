pragma solidity ^0.6.12;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CodeworkNFT is ERC721 {
  uint public worksCount = 0;
  uint public codeCount = 0;
  mapping(uint => Works) public workList;
  mapping(uint => CodeWork) public codeworkList;

  struct Works {
    uint workId;
    string metadataURL;
    uint date;
    bool isCompleted;
    address payable from;
  }

  struct CodeWork {
    uint codeId;
    uint workId;
    uint nftId;
    uint date;
    uint price;
    address payable from;
  }

  event WorkCreated (
    uint workId,
    string metadataURL,
    uint date,
    address payable from
  );

  event CodeWorkSubmit (
    uint codeId,
    uint workId,
    string codeURL,
    uint date,
    uint price,
    address payable from
  );

  event CodeworkCreated (
    uint tokenId,
    string metadataURL,
    uint date,
    address from
  );

   event Payment (
    address from,
    address to,
    uint workId,
    uint codeId,
    uint amount
  );

  constructor() ERC721("Codework NFT", "CWN")  public {}

  function createWork(string memory _metadataURL) external {
    worksCount++;

    workList[worksCount] = Works(worksCount, _metadataURL, now, false, msg.sender);
    emit WorkCreated(worksCount, _metadataURL, now, msg.sender);
  }

  function addCodeToWork(uint _workId, uint _price, string memory _codeURL) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _codeURL);

    codeCount++;
    codeworkList[codeCount] = CodeWork(codeCount, _workId, _tokenId, now, _price, msg.sender);
    
    emit CodeWorkSubmit(codeCount, _workId, _codeURL, now, _price, msg.sender);
  }

  function payCode(uint _codeId) external payable {
    CodeWork memory _codeWork = codeworkList[_codeId];

    _codeWork.from.transfer(msg.value);

    workList[_codeWork.workId].isCompleted = true;
    codeworkList[_codeId] = _codeWork;

    emit Payment(msg.sender, _codeWork.from, _codeWork.workId, _codeId, msg.value);
  }
}