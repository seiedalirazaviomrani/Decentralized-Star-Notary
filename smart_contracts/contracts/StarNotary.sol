pragma solidity ^0.4.23;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 { 

    struct Star { 
        string story;
        string ra;
        string dec;
        string mag;
        bool isAssigned;
    }
    
    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    mapping(string => bool) private starIsAssigned;
    event starCreated(address owner);

    function createStar(string _story, string _ra, string _dec, string _mag, uint256 _tokenId) public { 
        require(!this.isStarExist(_ra, _dec, _mag));
        Star memory newStar = Star(_story, _ra, _dec, _mag, true);
        tokenIdToStarInfo[_tokenId] = newStar;
        starIsAssigned[this.append(_ra, _dec, _mag)] = true;
        _mint(msg.sender, _tokenId);
        emit starCreated(msg.sender);
    }

    function isStarExist(string _ra, string _dec, string _mag) public view returns (bool) {
        return starIsAssigned[this.append(_ra, _dec, _mag)];
    }

    function append(string _ra, string _dec, string _mag) public pure returns (string) {
        return string(abi.encodePacked(_ra, _dec, _mag));
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);
        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);
        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        starOwner.transfer(starCost);
        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }
}