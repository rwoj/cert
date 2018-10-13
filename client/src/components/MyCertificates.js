import React from "react";

class MyCertificates extends React.Component {
  state = { dataKey: null, result: null };

  componentDidMount() {
    const { drizzle } = this.props;
    // const contract = drizzle.contracts.CertificateCreator;

    const result = drizzle.contracts.CertificateCreator
        .methods.certificates(0).call()
        .then(res => console.log("siema"));

    this.setState({result});
    // // let drizzle know we want to watch the `myString` method
    // const dataKey = contract.methods.certificates.cacheCall();

    // // save the `dataKey` to local component state for later reference
    // this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    // const { CertificateCreator } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    // const myString = CertificateCreator.certificates[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My certificates: {this.state.result && this.state.result.value}</p>;
  }
}

export default MyCertificates;