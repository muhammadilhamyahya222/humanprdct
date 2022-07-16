import React, { Component } from 'react'
import $ from "jquery";
import axios from "axios";


class Confirm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        order: [],
        id_order: "",
        image: null,
        message: ""
  
    }
}
    bind = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }

    
  getOrder = async() => {
    const id = localStorage.getItem('Id')
    const url = "http://localhost/shop/public/myorder/" +id
    await axios.get(url)
        .then(res => {
            this.setState({order: res.data.order})
        })
        .catch(error => {
            console.log(error)
        })
  }


  Pay = (id) => {
    $("#modal_payment").modal("show")
    this.setState({id_order: id})
  }


  Save = (e) => {
    if(window.confirm("Apakah bukti bayar yang anda upload telah benar?")){
    
    e.preventDefault()
    $("#modal_payment").modal("hide")
    let url = "http://localhost/shop/public/orders/pay"
    let form = new FormData()
    form.append("id_order", this.state.id_order)
    form.append("image", this.state.image)

    axios.post(url, form)
         .then(res => {
            alert("Pembayaran Berhasil")
            this.setState({message: res.data.message})
            window.location="/product"
          })
          .catch(error => {
                console.log(error);
          })
    }
  }

  Cancel = (id) => {
    if(window.confirm("Apakah anda yakin membatalkan order ini?")){
        let url = "http://localhost/shop/public/decline/" + id
        axios.post(url)
        .then(res => {
          alert("Pesanan anda telah dibatalkan")
          this.setState({message: res.data.message})
          this.getOrder()
        })
        .catch(error => {
            console.log(error)
        })
    }
}

    componentDidMount() {
      this.getOrder()
    }

    render() {
        const {order} = this.state;
        console.log(order)
      return (
        <div className="container">
            <div className="card mt-2 bg-light">
                <div style={{ paddingTop: "5%", paddingLeft: "0%" }}>
                  <div className="#" style={{ maxwidth: "200px" }}>
                  <h2 className="card-title text-center" style={{ fontWeight: "500" }}>PESANAN ANDA INI LUR</h2>
                  <h5 class="font-weight-light text-break text-center mt-2">Terimakasih telah membuat aku kaya, silakan melakukan pembayaran dalam 24 jam.</h5>
                  <h5 class="font-weight-light text-break text-center mt-2">Jika kami tidak menerima konfirmasi pembayaran, kami tidak bisa makan, dan pesanan anda kami anggap batal.</h5>
                  </div>
                  <div class="card ml-5 mr-5 mb-4 text-center">
                    {order.map((item, index) => {
                        return (
                            <div class="card-header" key = {index}>
                            {item.total}
                            </div>
                        );
                    })}
                    </div>
                    
                 </div>
            </div>
      </div>
        
      );
      }
      
        
}

export default Confirm