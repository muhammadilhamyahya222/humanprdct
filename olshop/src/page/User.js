import React, {Component, Profiler} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';

class User extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            id_user: "",
            username: "",
            email: "",
            password: "",
            role: "",
            image: null,
        }
        // jika tidak terdapat data token pada lokal storage
        if(!localStorage.getItem("Token")){
            // direct ke halaman login
            window.location = "/";
        }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data
    Add = () => {
        // membuka modal
        $("#modal_user").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id_user: "",
            username: "",
            email: "",
            password: "",
            role: "",
            image: null
        });
    }
    // fungsi untuk membuka form edit data
    Edit = (item) => {
        // membuka modal
        $("#modal_user").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id_user: item.id_user,
            username: item.username,
            email: item.email,
            password: item.password,
            role: item.role,
            image: item.image
        });
    }
    get_user = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/shop/public/user";
        axios.get(url)
        .then(response => {
            this.setState({user: response.data.user});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id_user) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/shop/public/user/drop/"+id_user;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_user();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
      this.get_user();

    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_user").modal("hide");
        let url = "http://localhost/shop/public/user/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("password",this.state.password);
        form.append("role", this.state.role);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_user();
        })
        .catch(error => {
            console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13 ){
            // $("#loading").toast("show");
            let url = "http://localhost/shop/public/user";
            let form = new FormData();
            form.append("find",this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({user: response.data.user});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data User</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                    placeholder="Pencarian..." />
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
                                    <th>Nama</th>
                                    <th>Email</th>
                                    {/* <th>Password</th> */}
                                    <th>Role</th>
                                    <th>Gambar</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.user.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            {/* <td>{item.password}</td> */}
                                            <td>{item.role}</td>
                                            <td><img src={'http://localhost/shop/public/images/' + item.image}
                                                   alt={item.image} width="200px" height="200px"/></td>
                                            <td>
                                                
                                                <Link to="/profile">
                                                <button className="m-1 btn btn-sm btn-primary">
                                                    <span className="fa fa-info-circle"></span>
                                                </button>
                                                </Link>
                                                <button className="m-1 btn btn-sm btn-warning" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Drop(item.id_user)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>

                        {/* form modal siswa*/}
                        <Modal id="modal_user" title="Form User" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Username
                                <input type="text" className="form-control" name="username"
                                  value={this.state.username} onChange={this.bind} required />
                                Email
                                <input type="text" className="form-control" name="email"
                                  value={this.state.email} onChange={this.bind} required />
                                Password
                                <input type="password" className="form-control" name="password" value={this.state.password}
                                  onChange={this.bind} required />
                                Role
                                <input type="text" className="form-control" name="role" value={this.state.role}
                                  onChange={this.bind} required />
                                Gambar
                                <tr>
                                  <input type="file" className="file-control" name="image"
                                    onChange={this.bindImage} required /> 
                                </tr>
                                <button type="submit" className="btn btn-info pull-right m-2">
                                  <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
export default User
