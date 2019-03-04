import React, { Component } from 'react';
//import QrCodeScanner from '@sensorfactdev/qr-code-scanner';
import QrReader from "react-qr-reader-webcam-js";
import { withAuth } from '../components/AuthProvider';
import { Route, Redirect } from 'react-router-dom';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      redirect: false,
      result: "No result"
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    if (data) {
      this.setState({
        result: data,
        redirect: true,
      })
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={"/contacts/" + this.state.result} />
    }
    return (
      <div>
        <h1>Scan the QR code</h1>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default withAuth()(Test);