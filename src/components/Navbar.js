import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <div className="leftside">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-4"
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
        style={{fontSize: "30px"}}
      >
        HRN
      </a>
        <a style={{marginLeft: '4vw', color: 'white'}}>
          About
        </a>
      </div>  
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar