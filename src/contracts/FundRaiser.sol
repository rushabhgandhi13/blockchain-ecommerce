pragma solidity >=0.4.22 <0.9.0;

contract FundRaiser {

    struct FundRaiser {
        uint256 id;
        string name;
        string description;
        uint256 AmountRequired;
        uint256 AmountAlreadyRaised;
        address UserAccount;
        bool raised;
    }

    uint256 public count = 0;
    FundRaiser[] public raisers;

    event Registered(uint256 id, string name, string description, uint256 AmountRequired, uint256 AmountAlreadyRaised, address UserAccount, bool raised);
    event Donate(uint256 id, string name, uint256 AmountAlreadyRaised, address UserAccount, bool raised);

    function register(string memory name, string memory description, uint256 AmountRequired) public {
        require(bytes(name).length>0, "Name field can't be empty");
        require(bytes(description).length>0, "Description field can't be empty");
        require(AmountRequired>0, "Amount to be raised must be greater than 0");
        FundRaiser memory raiser;
        raiser.id=count;
        raiser.name=name;
        raiser.description=description;
        raiser.AmountRequired=AmountRequired*(1 ether);
        raiser.AmountAlreadyRaised=0;
        raiser.UserAccount=msg.sender;
        raiser.raised=false;
        raisers.push(raiser);
        count++;
        emit Registered(count, name, description, AmountRequired, 0, msg.sender, false);
    }

    function donate(uint256 id) public payable {
        require(id>=0 && id<count, "Please enter valid ID");
        require(raisers[id].UserAccount!=msg.sender, "User cannot donate to its own fund-raisers");
        require(raisers[id].raised==false, "Fundraiser has ended");
        raisers[id].AmountAlreadyRaised=raisers[id].AmountAlreadyRaised+msg.value;
        if(raisers[id].AmountAlreadyRaised>=raisers[id].AmountRequired)
        {
            raisers[id].raised=true;
        }
        payable(raisers[id].UserAccount).transfer(msg.value);
        emit Donate(id, raisers[id].name, raisers[id].AmountAlreadyRaised, msg.sender, raisers[id].raised);
    }
}