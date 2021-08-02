pragma solidity ^0.6.12;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CodeworkNFT is ERC721 {
  uint public codeCount = 0;
  mapping(uint => CodeWork) public codeworkList;
  mapping(uint => string) private secretCodeList;

  struct CodeWork {
    uint codeId;
    string workId;
    uint nftId;
    uint date;
    uint price;
    string email;
    address payable from;
    address payable viewer;
  }

  event CodeWorkSubmit (
    uint codeId,
    string workId,
    string previewURL,
    uint date,
    uint price,
    string email,
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

  function addCodeToWork(string memory _workId, uint _price, string memory _previewURL, string memory _email,  string memory _codeURL) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _previewURL);

    codeCount++;
    codeworkList[codeCount] = CodeWork(codeCount, _workId, _tokenId, now, _price, _email, msg.sender, msg.sender);
    
    secretCodeList[codeCount] = _codeURL;
    
    emit CodeWorkSubmit(codeCount, _workId, _previewURL, now, _price, _email, msg.sender, msg.sender);
  }

  function payCode(uint _codeId) external payable {
    CodeWork memory _codeWork = codeworkList[_codeId];

    _codeWork.from.transfer(msg.value);
    _codeWork.viewer = msg.sender;
    codeworkList[_codeId] = _codeWork;

    emit Payment(msg.sender, _codeWork.from, _codeWork.workId, _codeId, msg.value);
  }

  function getCodeURLByNFTId(uint _codeId) public view returns (string memory) {
    CodeWork memory _codeWork = codeworkList[_codeId];
    require(_codeWork.viewer == msg.sender, "You do not own this code");

    return secretCodeList[_codeId];
  }
}