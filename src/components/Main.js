import React, { Component } from 'react';
import './Main.css';
import {ethers} from 'ethers';

class Main extends Component {

  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    console.log(this.props);
  }

  render() {
    const showTable = this.props.raisers.map((raiser,key) => (
      <div className="my-4" key={key}>
          {this.props.account ==  raiser.UserAccount ? (
            
              <div className="card" style={{width: "40rem"}}>
                <div className="card-body">
                  <h5 className="card-title">{raiser.name}</h5>
                  <h6 className="card-subtitle mb-2">{window.web3.utils.fromWei(raiser.AmountRequired.toString(), 'Ether')} Eth</h6>
                  <h6 className="card-subtitle mb-2">{window.web3.utils.fromWei(raiser.AmountAlreadyRaised.toString(), 'Ether')} Eth</h6>
                  <p className="card-text">{raiser.description}</p>
                  <div>
                  </div>
                </div>
                </div>
            
            ) : 
            (
                <div style={{display: "None"}}></div>
            )}
            </div>
    ))
    return (
      <div id="content" className='container-fluid' style={{marginTop: "5vh"}}>
        <h1>Create Fund Raiser</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.raiserName.value
          const desc = this.raiserDesc.value
          const amountToRaise = this.raiserPrice.value.toString()
          this.props.createRaiser(name, desc, amountToRaise)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.raiserName = input }}
              className="form-control"
              placeholder="Fund Raiser Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productDesc"
              type="text"
              ref={(input) => { this.raiserDesc = input }}
              className="form-control"
              placeholder="Fund Raiser Description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.raiserPrice = input }}
              className="form-control"
              placeholder="Amount to raise"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Create Fund Raiser</button>
        </form>
        <p>&nbsp;</p>
        <h2>Donate to a fund raiser</h2>
      {/*<table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Amount to raise</th>
            <th scope="col">Amount already raised</th>
            <th scope="col">Fund raiser address</th>
          </tr>
        </thead>
        <tbody id="productList">
          { this.props.raisers.map((raiser, key) => {
            return(
              <tr key={key}>
                <th scope="row">{raiser.id.toString()}</th>
                <td>{raiser.name}</td>
                <td>{raiser.description}</td>
                <td>{window.web3.utils.fromWei(raiser.AmountRequired.toString(), 'Ether')} Eth</td>
                <td>{window.web3.utils.fromWei(raiser.AmountAlreadyRaised.toString(), 'Ether')} Eth</td>
                <td>{raiser.UserAccount}</td>
                <td>
                {this.props.account !=  raiser.UserAccount ? (
                    !raiser.raised
                    ? 
                    // <button
                    //     className="btn btn-primary"
                    //     name={raiser.id}
                    //     value={raiser.price}
                    //     onClick={(event) => {
                    //       this.props.donateRaiser(event.target.name, event.target.value)
                    //     }}
                    //   >
                    //     Donate
                    //   </button>

                      <div>
                      <form onSubmit={(event) => {
                        event.preventDefault()
                        const name = raiser.id
                        const amountToRaise = this.donPrice.value.toString()
                        const val = ethers.utils.parseUnits(amountToRaise, "ether");
                        this.props.donateRaiser(name, val)
                      }}>
                        <div className="form-group mr-sm-2">
                          <input
                            id="donPrice"
                            type="text"
                            ref={(input) => { this.donPrice = input }}
                            className="form-control"
                            placeholder="Amount to Donate"
                            required />
                        </div>
                        <button type="submit" className="btn btn-primary">Donate</button>
                      </form>
                      </div>

                    : <button className="btn btn-secondary" disabled>Closed</button>
                ) : 
                (
                    <button className="btn btn-success" disabled>Personal fund raiser</button>
                )}
                  </td>
              </tr>
            )
          })}
        </tbody>
        </table>*/}     
        
        <div>
          <div className="row row-content">
          { this.props.raisers.map((raiser, key) => {
            return(
              <div className="col-6 my-4" key={key}>
              <div className="card" style={{width: "40rem"}}>
                <div className="card-body">
                  <h5 className="card-title">{raiser.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{raiser.UserAccount}</h6>
                  <h6 className="card-subtitle mb-2">{window.web3.utils.fromWei(raiser.AmountRequired.toString(), 'Ether')} Eth</h6>
                  <h6 className="card-subtitle mb-2">{window.web3.utils.fromWei(raiser.AmountAlreadyRaised.toString(), 'Ether')} Eth</h6>
                  <p className="card-text">{raiser.description}</p>
                  <div>
                  <form style={{display: "flex"}} onSubmit={(event) => {
                        event.preventDefault()
                        const name = raiser.id
                        const amountToRaise = this.donPrice.value.toString()
                        const val = ethers.utils.parseUnits(amountToRaise, "ether");
                        this.props.donateRaiser(name, val)
                      }}>
                        <div className="form-group mr-sm-2">
                          <input
                            id="donPrice"
                            type="text"
                            ref={(input) => { this.donPrice = input }}
                            className="form-control"
                            placeholder="Amount to Donate"
                            style={{width: "25vw"}}
                            required
                             />
                        </div>
                        <div className="form-group mr-sm-2">
                        {this.props.account !=  raiser.UserAccount ? (
                          !raiser.raised?
                        (<button type="submit" className="btn btn-primary">Donate</button>)
                        :
                        (<button type="submit" className="btn btn-primary" disabled>Donate</button>)
                        ):
                        <button type="submit" className="btn btn-primary" disabled>Your own raiser</button>
                      }
                        </div>
                      </form>
                  </div>
                </div>
                </div>
            </div>
            )
          })}
          </div>
        </div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          View Your Fund Raisers
        </button><br></br><br></br>


        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: '55vw'}}>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Your Fund Raisers</h5>
              </div>
              <div class="modal-body">
              
                {showTable}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
