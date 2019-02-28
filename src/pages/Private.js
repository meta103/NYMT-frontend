import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Image } from 'react-bootstrap';
class Private extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <h1>Welcome {user.name}</h1>
        <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${user._id}&amp;size=250x250`} alt="" title="" thumbnail />
      </div>
    )
  }
}

export default withAuth()(Private);