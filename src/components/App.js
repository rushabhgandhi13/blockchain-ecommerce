import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import FundRaiser from '../abis/FundRaiser.json';
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = FundRaiser.networks[networkId]
    if(networkData) {
      const fundraiser = web3.eth.Contract(FundRaiser.abi, networkData.address)
      this.setState({ fundraiser })
      const raiserCount = await fundraiser.methods.count().call()
      this.setState({ raiserCount })
      for (var i=0;i<raiserCount;i++) {
        const raiserPart = await fundraiser.methods.raisers(i).call()
        this.setState({
        raisers: [...this.state.raisers, raiserPart]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('FundRaiser contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      raiserCount: 0,
      raisers: [],
      loading: true
    }

    this.createRaiser = this.createRaiser.bind(this)
    this.donateRaiser = this.donateRaiser.bind(this)
  }

  createRaiser(name, description, amountRequired) {
    this.setState({ loading: true })
    this.state.fundraiser.methods.register(name, description, amountRequired).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false }) 
    })
  }

  donateRaiser(id, amountToDonate) {
    this.setState({ loading: true })
    this.state.fundraiser.methods.donate(id).send({ from: this.state.account, value: amountToDonate })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  raisers={this.state.raisers}
                  createRaiser={this.createRaiser}
                  donateRaiser={this.donateRaiser} 
                  account={this.state.account} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
