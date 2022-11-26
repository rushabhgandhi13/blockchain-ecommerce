import React, { Component } from 'react';
//<a style={{marginLeft: '4vw', color: 'white'}}>About</a> 

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" style={{height: "77px"}}>
      <div className="leftside">
      <h5 style={{ color: "white", marginLeft: "40px"}}>Fund Raiser</h5>
      </div>  
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <div className="text-white"><span id="account">Active: {this.props.account}</span></div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar