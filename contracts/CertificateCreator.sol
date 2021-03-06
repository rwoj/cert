pragma solidity ^0.4.24;


contract CertificateCreator{
    //dynamic array with addresses of deployed auctions
    address[] public certificates; 

    function createCertificate() public {
        address newCertificate = new Certificate(msg.sender);
        certificates.push(newCertificate);
    }
}


// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------

contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function transfer(address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    
    //function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    //function approve(address spender, uint tokens) public returns (bool success);
    //function transferFrom(address from, address to, uint tokens) public returns (bool success);
    //event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract Certificate is ERC20Interface{
    address public owner;
    uint public quantity;
    mapping(address => uint) public balances;
    
    struct CertificateDetails {
        string description;
        uint liczba;
    }
    CertificateDetails public certificateDetails;
    
  
    event Transfer(address indexed _from, address indexed _to, uint _quantity);


    constructor(address _owner) public{
        // quantity = _quantity;
        quantity = 100;
        owner = _owner;
        balances[owner] = quantity;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    } 

    function enterCertificateDetails(string _description, uint _liczba) public onlyOwner returns (bool success){
        certificateDetails.description = _description;
        certificateDetails.liczba = _liczba;
        return true;
    }    
    
    function getCerfificateDetails() public view returns(string description, uint liczba ){
        return (certificateDetails.description, certificateDetails.liczba);
    }
    
    function totalSupply() public view returns (uint){
        return quantity;
    }
    
    function balanceOf(address _owner) public view returns (uint _ownerBalance){
        return balances[_owner];
    }
     
     
    //transfer from the owner balance to another address
    function transfer(address to, uint _quantity) public returns (bool success){
        require(balances[msg.sender] >= _quantity && _quantity > 0);
         
        balances[to] += _quantity;
        balances[msg.sender] -= _quantity;
         
        emit Transfer(msg.sender, to, _quantity);
         
        return true;
    }
}