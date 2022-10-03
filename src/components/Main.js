import React, { Component } from 'react';
import './Main.css';

class Main extends Component {

  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    console.log(this.props);
  }

  render() {
    const showTable = this.props.products.map((product,key) => (
          <tbody id="productList">
            
          {this.props.account ==  product.owner ? (
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <td>{product.name}</td>
                <td>{product.desc}</td>
                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                <td>{product.owner}</td>
              </tr>
            ) : 
            (
                <div style={{display: "None"}}></div>
            )}
          
          </tbody>
    ))
    return (
      <div id="content" className='container col-lg-6 col-md-8 col-sm-12' style={{marginTop: "5vh"}}>
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const desc = this.productDesc.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, desc, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productDesc"
              type="text"
              ref={(input) => { this.productDesc = input }}
              className="form-control"
              placeholder="Product Description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Desc</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{product.desc}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                  {this.props.account !=  product.owner ? (
                     !product.purchased
                      ? <button
                          className="btn btn-primary"
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : <button className="btn btn-secondary" disabled>Sold</button>
                  ) : 
                  (
                      <button className="btn btn-success" disabled>Owned</button>
                  )}
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>        
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          View Your Products
        </button><br></br><br></br>


        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: '55vw'}}>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Your Products</h5>
              </div>
              <div class="modal-body">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Desc</th>
                    <th scope="col">Price</th>
                    <th scope="col">Owner</th>
                  </tr>
                </thead>
                {showTable}
                </table>
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
