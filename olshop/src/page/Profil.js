import React,{Component} from 'react';
import $ from "jquery";
import axios from 'axios';
import Modal from "../component/Modal";

export default class Profil extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            id_user: "",
            fullname: "",
            username: "",
            alamat: "",
            email: "",
            tmp_lahir: "",
            tgl_lahir: "",
            gender: "",
            role: "User",
            nohp: "",
            image: null,
            alamat: [],
            id_pengiriman: "",
            receiver: "",
            pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
            action: "",
            find: "",
            message: ""
        }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
    
    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
    }

    Edit = (item) => {
        $("#modal_user").modal("show");
        this.setState({
            action: "update",
            id_user: item.id_user,
            username: item.username,
            fullname: item.fullname,
            alamat: item.alamat,
            email: item.email,
            tmp_lahir: item.tmp_lahir,
            tgl_lahir: item.tgl_lahir,
            gender: item.gender,
            nohp: item.nohp,
            image: item.image
        });        
    }
    get_user = () => {
        let id = JSON.parse(localStorage.getItem('id_user'))
        let url = "http://localhost/shop/public/user/" + id;
        axios.get(url)
        .then(response => {
            this.setState({
                user: response.data.user,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    get_alamat = () => {
        let id = JSON.parse(localStorage.getItem('id_user'))
        let url = "http://localhost/shop/public/alamat/" + id;
        axios.get(url)
        .then(response => {
            this.setState({
                   alamat: response.data.alamat,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    Add_alamat = () => {
        $("modal_alamat").modal("show");
        this.setState({
            action: "insert",
            id_pengiriman: "",
            id_user: "",
            receiver: "",
            pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
        })
    }

    Edit_alamat = (item) => {
        $("#modal_alamat").modal("show");
        this.setState({
            action: "update",
            id_pengiriman: item.id_pengiriman,
            id_user: item.id_user,
            receiver: item.receiver,
            pos: item.pos,
            kecamatan: item.kecamatan,
            kota: item.kota,
            jalan: item.jalan,
            rt: item.rt,
            rw: item.rw,
        });        
    }

    Drop_alamat = (id_pengiriman) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/shop/public/alamat/drop/"+id_pengiriman;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_alamat();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount = () => {
        this.get_user();
        this.get_alamat();
    }
    Save = (event) => {
        console.log(this.state.id_user)
        event.preventDefault();
        $("#modal_user").modal("hide");
        let url = "http://localhost/shop/public/user/save_profil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("fullname", this.state.fullname);
        form.append("username", this.state.username);
        form.append("alamat", this.state.alamat);
        form.append("email", this.state.email);
        form.append("tmp_lahir", this.state.tmp_lahir);
        form.append("tgl_lahir", this.state.tgl_lahir);
        form.append("gender", this.state.gender);
        form.append("role", this.state.role);
        form.append("nohp", this.state.nohp);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            this.setState({
                message: response.data.message});
                $("#message").toast("show");
                this.get_user();
        })
        .catch(error => {
            console.log(error);
        });
    }

    Save_alamat = (event) => {
        console.log(this.state.id_user)
        event.preventDefault();
        $("#modal_alamat").modal("hide");
        let url = "http://localhost/shop/public/alamat/save_profil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_pengiriman", this.state.id_pengiriman);
        form.append("id_user", this.state.id_user);
        form.append("receiver", this.state.receiver);
        form.append("pos", this.state.pos);
        form.append("kecamatan", this.state.kecamatan);
        form.append("kota", this.state.kota);
        form.append("jalan", this.state.jalan);
        form.append("rt", this.state.rt);
        form.append("rw", this.state.rw);
        form.append("role", this.state.role);
        form.append("nohp", this.state.nohp);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            this.setState({
                message: response.data.message});
                $("#message").toast("show");
                this.get_alamat();
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        const { user, alamat } = this.state;
        console.log(user)
        console.log(alamat)
        return (
            <div className="container">
            <div className="card mt-2">
                <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
                  <div className="#" style={{ maxwidth: "200px" }}>
                  <h2 className="card-title" style={{ fontWeight: "700" }}>Profile</h2>
                    <div className="row no-gutters">
                    {user.map((item, index) => {
                        return (
                        <div style={{paddingTop: "2%"}} className="col-md-2.5" key = {index}>               
                        <img className="rounded float-left" src={'http://localhost/shop/public/images/' + item.image} style={{ height: "240px", width: "200px" }} onChange={this.bindImage} required />    
                        </div>
                        );
                        })}
                        <div style={{paddingTop: "0%",paddingLeft: "0%" }}>
                        <div className="card-body">
                        
                        <table className="w3-table-all w3-centered">
                        {user.map((item) => {
                            return (
                                <ul class="list-group">
                                <li class="list-group-item">Nama Lengkap : {item.fullname}</li>
                                <li class="list-group-item">Username : {item.username}</li>
                                <li class="list-group-item">Alamat : {item.alamat}</li>
                                <li class="list-group-item">Email : {item.email}</li>
                                <li class="list-group-item">Jenis Kelamin : {item.gender}</li>
                                <li class="list-group-item">Tempat Lahir : {item.tmp_lahir}</li>
                                <li class="list-group-item">Tanggal Lahir : {item.tgl_lahir}</li>
                                <li class="list-group-item">No Hp : +628{item.nohp}</li>
                                <button className="m-1 btn btn-sm btn-outline-warning" onClick={() => this.Edit(item)}>
                                <span className="fa fa-edit"></span>Edit
                                </button>
                                </ul>
                            );
                        })}
                        <h2 className="card-title" style={{ fontWeight: "700" }}>Data Pengiriman</h2>
                        {alamat.map((item) => {
                            return (
                                <ul class="list-group">
                                <li class="list-group-item">Nama Penerima : {item.receiver}</li>
                                <li class="list-group-item">Kode Pos : {item.pos}</li>
                                <li class="list-group-item">Kecamatan : {item.kecamatan}</li>
                                <li class="list-group-item">Kota : {item.kota}</li>
                                <li class="list-group-item">Jalan : {item.jalan}</li>
                                <li class="list-group-item">RT : {item.rt}</li>
                                <li class="list-group-item">RW : {item.rw}</li>
                                <button className="m-1 btn btn-sm btn-outline-warning" onClick={() => this.Edit_alamat(item)}>
                                <span className="fa fa-edit"></span>Edit
                                </button>
                                </ul>
                            );
                        })}
                    </table>
                    </div>
                    </div>
                
                <Modal id="modal_user" title="Form User" bg_header="primary" text_header="white">
                    <form onSubmit={this.Save}>
                    Nama Lengkap
                    <input type="text" className="form-control" name="fullname"
                    value={this.state.fullname} onChange={this.bind} required />
                    Username
                    <input type="text" className="form-control" name="username"
                    value={this.state.username} onChange={this.bind} required />
                    Alamat
                    <input type="text" className="form-control" name="alamat"
                    value={this.state.alamat} onChange={this.bind} required />
                    Jenis Kelamin 
                    <input type="text" className="form-control" name="gender"
                    value={this.state.gender} onChange={this.bind} required />
                    Tempat Lahir
                    <input type="text" className="form-control" name="tmp_lahir"
                    value={this.state.tmp_lahir} onChange={this.bind} required />
                    Tanggal Lahir
                    <input type="text" className="form-control" name="tgl_lahir"
                    value={this.state.tgl_lahir} onChange={this.bind} required />
                    No HP
                    <input type="text" className="form-control" name="nohp"
                    value={this.state.nohp} onChange={this.bind} required />
                    Gambar
                    <tr>
                      <input type="file" className="file-control" name="image"
                        onChange={this.bindImage} required /> 
                    </tr>
                    <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Save
                    </button>
                    </form>
                </Modal>
            </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
}