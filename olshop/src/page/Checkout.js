import React, { Component } from 'react'
import $ from "jquery";
import axios from "axios";


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
       products: [],
       alamat: [],
       id_user: "",
       id_alamat: "",
       num: 0,
       total: 0,
       message: "",
    }
}
    bind = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }
    
    getProducts = () => {
      let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
      let total = 0
      let num = 0
      items.forEach(item => {
          total += item.total
          num += item.stock
      });
      this.setState({
          products: items,
          num: num,
          total: total
      });
    }

    getAlamat = async() => {
        const id = localStorage.getItem('id_user')
        const url = "http://localhost/shop/public/alamat/user/" + id;
        await axios.get(url)
        .then(response => {
            this.setState({id_user: id, alamat: response.data.alamat})
        })
        .catch(error => {
            console.log(error);
        });
    }

    Order = (e) => {
      e.preventDefault()
      let url = "http://localhost/shop/public/order/save"
      let form = new FormData()
      form.append("id_user", this.state.id_user)
      form.append("id_alamat", this.state.id_alamat)
      form.append("total", this.state.total)
      form.append("products", JSON.stringify(this.state.products))

      axios.post(url, form)
        .then(response => {
          alert("Order berhasil")
          this.setState({message: response.data.message})
          localStorage.removeItem('cart')
        })
        .catch (error => {
          console.log(error);
        })
    }

    componentDidMount() {
      this.getProducts()
      this.getAlamat();
    }

    render() {
      const { products, num, total, alamat } = this.state;
      console.log(alamat);
      return (
        <div>
          <div className="container">
              <div className="py-5 text-center">
                  <h2>Checkout</h2>
              </div>
              <div className="row">
                  <div className="col-md-4 order-md-2 mb-2">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-muted">Your cart</span>
                          <span className="badge badge-secondary badge-pill">{num}</span>
                      </h4>
                      <table class="table table-secondary bg-white">
                          <thead>
                              <tr>
                                  <th scope="col">Product</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">SubTotal</th>
                                  <th scope="col">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {products.map((product, index) =>
                                  <tr key={index}>
                                      <td>
                                        <h5 className="text-capitalize font-weight-bold">{product.name}</h5>
                                        <h6 className="badge"><small>price/product : </small>${product.price}</h6>
                                      </td>
                                      <td>
                                        <h5><span className="badge">{product.stock}</span></h5>
                                      </td>
                                      <td>
                                        <h5>
                                        <span className="badge">$ {product.total}</span>
                                        </h5>
                                      </td>
                                      <td>
                                          <button className="btn btn-sm btn-danger"
                                              onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span> Hapus</button>
                                      </td>
                                  </tr>
                              )
                              }
                          </tbody>
                      </table>
                      {products.length ?
                          <div><h4>
                              <small className="ml-3">Total Harga: </small>
                              <span className="float-right">$ {total}</span>
                          </h4><hr /></div> : ''
                      }
                  </div>
                  <div className="col-md-8 order-md-1">
                      <h4 className="mb-3">Pilih Alamat Pengiriman</h4>
                      <form className="needs-validation" noValidate>
                          <div className="row">
                              <div className="col md-3">
                                  <label htmlFor="state">Alamat</label>
                                  <select className="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                                      {this.state.alamat.map((item) => {
                                          return (
                                              <option value="{item.id}">{item.jalan}</option>
                                          )
                                      })}
                                  </select>
                                
                              </div>
                          </div>
                          <hr/>
                          <button className="btn btn-success btn-block" type="submit">
                              Continue to checkout
                          </button>
                      </form>
                  </div>
              </div>
          </div>
            </div>
      );
      }
      
        
}

export default Checkout