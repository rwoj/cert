import React from "react";
// import Certificate from "./../contracts/Certificate.json";

class IssueCertificate extends React.Component {
  state = { stackId: null };
  
  // componentDidMount() {
  //   const { drizzle, drizzleState } = this.props;
  // }

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      // this.setValue(e.target.value);
      this.setValue('15');
    }
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.CertificateCreator;
    
    console.log("heja", drizzleState.accounts[0]);
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.createCertificate.cacheSend({
     from: drizzleState.accounts[0], 
    });
    // from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    console.log(this.props.drizzleState);

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default IssueCertificate;