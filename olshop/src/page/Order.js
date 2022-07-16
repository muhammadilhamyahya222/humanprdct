import React, {Component, Profiler} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link, Redirect } from 'react-router-dom';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            action : "",
            find : "",
            message : ""
        }
    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    get_order = () => {
        let url = "http://localhost/shop/public/order";
        axios.get(url)
        .then(response => {
            this.setState({order: response.data.order});
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    componentDidMount = () => {
      this.get_order();

    }
    Accept = (id) => {
        if(window.confirm("Apakah anda yakin untuk mengonfirmasi order ini?")) {
            let url = "http://localhost/shop/public/accept/" + id
            axios.post(url)
            .then (response => {
                this.get_order()
            })
            .catch(error => {
                console.log(error)
            })
        }
    }


    Decline = (id) => {
        if(window.confirm("Apakah anda yakin untuk membatalkan order ini?")) {
            let url = "http://localhost/shop/public/decline/" + id
            axios.post(url)
            .then (response => {
                this.get_order()
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    render(){
        // const role = localStorage.getItem("Role")
        // if (!role && !(role === "admin")) return (<Redirect to="/"/>);
        console.log(this.state.order)
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Order</h4>
                            </div>
                        
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin faspinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Alamat</th>
                                    <th>Total</th>
                                    <th>Pembayaran</th>
                                    <th>Status</th>
                                    <th>Detail Order</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.order.map((item) => {
                                    return (
                                        <tr key={item.id_order}>
                                            <td>{item.id_order}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.jalan}</td>
                                            <td>{item.total}</td>
                                            <td><img src={'http://localhost/shop/public/images/' + item.bukti}
                                                   alt={item.bukti} width="200px" height="200px"/></td>
                                            <td>{item.status}</td>
                                            <td>
                                                {item.detail.map((it) => {
                                                    return(
                                                        <ul key={it.id_order}>
                                                            <li>{it.nama_product} ({it.quantity})</li>
                                                        </ul>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Accept(item)}>
                                                    <span className="fa fa-check"></span> Accept
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Decline(item.id)}>
                                                    <span className="fa fa-trash"></span> Decline
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        );
    }
}
export default Order;