// SPDX-License-Identifier: MIT

/**
    ## Disclaimer
    These contracts are not audited.  Please review this code on your own before
    using any of the following code for production.  I will not be responsible or
    liable for all loss or damage caused from this project.
*/

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CodeworkNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;

  uint public codeCount = 0;
  mapping(uint => CodeWork) public codeworkList;
  mapping(uint => string) private secretCodeList;

  uint public codeDataCount = 0;
  mapping(uint => CodeData) public codeDataList;

  struct CodeWork {
    uint codeId;
    string workId;
    uint nftId;
    uint date;
    uint price;
    string email;
    address from;
    address viewer;
  }

  struct CodeData {
    uint codeId;
    string title;
    string url;
    uint price;
    string description;
    uint date;
    address from;
  }

  event CodeWorkSubmit (
    uint codeId,
    string workId,
    string previewURL,
    uint date,
    uint price,
    string email,
    address from,
    address viewer
  );

  event CodeDataLog (
    uint codeId,
    string title,
    string url,
    uint price,
    string description,
    uint date,
    address from
  );

  event Payment (
    address from,
    address to,
    string workId,
    uint codeId,
    uint amount
  );

  event PurchaseCodeNFT (
    address from,
    address to,
    uint codeId,
    string url,
    uint amount
  );

  constructor() ERC721("Codework NFT", "CWN") {}

  function addCodeToWork(string memory _workId, uint _price, string memory _previewURL, string memory _email,  string memory _codeURL) external {
    _tokenIds.increment();
    uint _tokenId = _tokenIds.current();
    _mint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _previewURL);

    address _owner = msg.sender;

    codeCount++;
    codeworkList[codeCount] = CodeWork(codeCount, _workId, _tokenId, block.timestamp, _price, _email,_owner,_owner);
    
    secretCodeList[codeCount] = _codeURL;
    
    emit CodeWorkSubmit(codeCount, _workId, _previewURL, block.timestamp, _price, _email,_owner,_owner);
  }

  function addCodeToList(string memory _title, string memory _url, uint _price, string memory _description) external {
    codeDataCount++;
    codeDataList[codeDataCount] = CodeData(codeDataCount, _title, _url, _price, _description, block.timestamp, msg.sender);
    
    emit CodeDataLog(codeDataCount, _title, _url, _price, _description, block.timestamp, msg.sender);
  }

  function payCode(uint _codeId) external payable {
    CodeWork memory _codeWork = codeworkList[_codeId];

    payable(_codeWork.from).transfer(msg.value);
    _codeWork.viewer = msg.sender;
    codeworkList[_codeId] = _codeWork;

    emit Payment(msg.sender, _codeWork.from, _codeWork.workId, _codeId, msg.value);
  }

  function getCodeURLByNFTId(uint _codeId) external view returns (string memory) {
    CodeWork memory _codeWork = codeworkList[_codeId];
    require(_codeWork.viewer == msg.sender, "You do not own this code");

    return secretCodeList[_codeId];
  }

  function buyCodeNFT(uint _codeId) external payable {
    CodeData memory _codeData = codeDataList[_codeId];
    payable(_codeData.from).transfer(msg.value);

    _tokenIds.increment();
    uint _tokenId = _tokenIds.current();
    _mint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _codeData.url);

    emit PurchaseCodeNFT(msg.sender, _codeData.from, _codeId, _codeData.url, msg.value);
  }

  function getAllNFTsOwnByUser(address _userAddress) external view returns (CodeData[] memory) {
    uint totalNFTCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalNFTCount; i++) {
      if (codeDataList[i + 1].from == _userAddress) {
        itemCount += 1;
      }
    }

    CodeData[] memory items = new CodeData[](itemCount);

    for (uint i = 0; i < totalNFTCount; i++) {
      if (codeDataList[i + 1].from == _userAddress) {
        uint currentId = i + 1;
        CodeData memory currentNFT = codeDataList[currentId];
        items[currentIndex] = currentNFT;
        currentIndex += 1;
      }
    }

    return items;   
  }
}