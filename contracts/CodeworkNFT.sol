pragma solidity ^0.6.12;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CodeworkNFT is ERC721 {
  uint public worksCount = 0;
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
    uint tokenId;
    string codeURL;
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
    uint tokenId,
    string codeURLs,
    uint date,
    uint price,
    address payable from
  );

  event CodeworkCreated (
    uint tokenId,
    string metadataURL,
    uint date,
    address payable from
  );

  constructor() ERC721("Codework NFT", "CWN")  public {}

  function createWork(string memory _metadataURL) external {
      worksCount++;

      workList[worksCount] = Works(worksCount, _metadataURL, now, false, msg.sender);
      emit WorkCreated(worksCount, _metadataURL, now, msg.sender);
    }

  function mintCodeworkNFT(string memory _metadataURL) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _metadataURL);

    emit CodeworkCreated(_tokenId, _metadataURL, now, msg.sender);
  }

  function addCodeToWork(uint _tokenId, uint _price, string memory _codeURL) external {
    codeworkList[_tokenId] = CodeWork(_tokenId, _codeURL, now, _price, msg.sender);
    emit CodeWorkSubmit(_tokenId, _codeURL, now, _price, msg.sender);
  }
}